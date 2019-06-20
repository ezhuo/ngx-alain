import {
  Injectable,
  Injector,
  Renderer2,
  RendererFactory2,
} from '@angular/core';
import {
  HttpClient,
  HttpEvent,
  HttpEventType,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { NoticeService } from './notice.service';

/**
 * 图片压缩类
 */
@Injectable({
  providedIn: 'root',
})
export class ImageCompressService {
  private renderer: Renderer2;
  maxSize = 500 * 1000;

  constructor(
    protected injector: Injector,
    rendererFactory: RendererFactory2,
    private http: HttpClient,
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  get noticeSrv() {
    return this.injector.get(NoticeService);
  }

  read(file: File) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function() {
        resolve(reader.result);
      };
    });
  }

  compress(
    imageDataUrlSource: any,
    render: Renderer2,
    ratio?: number,
    quality?: number,
  ): Promise<string> {
    const self = this;
    ratio = ratio ? ratio : 1;
    quality = quality ? quality : 0.5;

    return new Promise((resolve, reject) => {
      self.noticeSrv.msgInfo('正在压缩...');
      const sourceImage = new Image();
      // important for safari: we need to wait for onload event
      sourceImage.onload = function() {
        const canvas: HTMLCanvasElement = render.createElement('canvas');
        const ctx: CanvasRenderingContext2D = canvas.getContext('2d');

        canvas.width = sourceImage.naturalWidth * ratio;
        canvas.height = sourceImage.naturalHeight * ratio;

        ctx.drawImage(sourceImage, 0, 0, canvas.width, canvas.height);

        const mime = imageDataUrlSource.substr(5, imageDataUrlSource[0].length);
        // TODO test on mime
        const result = canvas.toDataURL('image/jpeg', quality);
        self.noticeSrv.msgInfo('准备上传...');
        resolve(result);
      };

      sourceImage.src = imageDataUrlSource;
    });
  }

  convertBase64UrlToBlob(urlData): Blob {
    const arr = urlData.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  }

  do(file: File) {
    if (file.size > this.maxSize) {
      const quality = this.maxSize / file.size;
      return new Promise((resolve, reject) => {
        this.read(file).then(srcData => {
          this.compress(srcData, this.renderer, 1, quality).then(value => {
            resolve(this.convertBase64UrlToBlob(value));
          });
        });
      });
    } else {
      return new Promise((resolve, reject) => {
        resolve(file);
      });
    }
  }

  nzCustomRequest = (item: any) => {
    // 构建一个 FormData 对象，用于存储文件或其他参数
    return this.do(item.file).then((bl: Blob) => {
      const formData = new FormData();
      // tslint:disable-next-line:no-any
      formData.append(item.name, bl);
      // tslint:disable-next-line: no-non-null-assertion
      const req = new HttpRequest('POST', item.action!, formData, {
        reportProgress: true,
        withCredentials: true,
      });
      // 始终返回一个 `Subscription` 对象，nz-upload 会在适当时机自动取消订阅
      return this.http.request(req).subscribe(
        (event: HttpEvent<{}>) => {
          if (event.type === HttpEventType.UploadProgress) {
            // tslint:disable-next-line: no-non-null-assertion
            if (event.total! > 0) {
              // tslint:disable-next-line:no-any
              // tslint:disable-next-line: no-non-null-assertion
              (event as any).percent = (event.loaded / event.total!) * 100;
            }
            // 处理上传进度条，必须指定 `percent` 属性来表示进度
            // tslint:disable-next-line: no-non-null-assertion
            item.onProgress!(event, item.file!);
          } else if (event instanceof HttpResponse) {
            // 处理成功
            // tslint:disable-next-line: no-non-null-assertion
            item.onSuccess!(event.body, item.file!, event);
          }
        },
        err => {
          // 处理失败
          // tslint:disable-next-line: no-non-null-assertion
          item.onError!(err, item.file!);
        },
      );
    });
  };
}
