import { NgModule, ModuleWithProviders } from '@angular/core';

// region: all modules
import { AdErrorCollectModule } from '@delon/abc/error-collect/error-collect.module';
import { AdFooterToolbarModule } from '@delon/abc/footer-toolbar/footer-toolbar.module';
import { AdSidebarNavModule } from '@delon/abc/sidebar-nav/sidebar-nav.module';
import { AdDownFileModule } from '@delon/abc/down-file/down-file.module';
import { AdImageModule } from '@delon/abc/image/image.module';
import { AdAvatarListModule } from '@delon/abc/avatar-list/avatar-list.module';
import { AdDescListModule } from '@delon/abc/desc-list/desc-list.module';
import { AdEllipsisModule } from '@delon/abc/ellipsis/ellipsis.module';
import { AdGlobalFooterModule } from '@delon/abc/global-footer/global-footer.module';
import { AdExceptionModule } from '@delon/abc/exception/exception.module';
import { AdNoticeIconModule } from '@delon/abc/notice-icon/notice-icon.module';
import { AdNumberInfoModule } from '@delon/abc/number-info/number-info.module';
import { AdPageHeaderModule } from '@delon/abc/page-header/page-header.module';
import { AdResultModule } from '@delon/abc/result/result.module';
import { AdStandardFormRowModule } from '@delon/abc/standard-form-row/standard-form-row.module';
import { AdTagSelectModule } from '@delon/abc/tag-select/tag-select.module';
import { AdTrendModule } from '@delon/abc/trend/trend.module';
import { AdCountDownModule } from '@delon/abc/count-down/count-down.module';
import { AdSimpleTableModule } from '@delon/abc/simple-table/simple-table.module';
import { AdReuseTabModule } from '@delon/abc/reuse-tab/reuse-tab.module';
import { AdFullContentModule } from '@delon/abc/full-content/full-content.module';
import { AdXlsxModule } from '@delon/abc/xlsx/xlsx.module';
import { AdZipModule } from '@delon/abc/zip/zip.module';
import { AdNumberToChineseModule } from '@delon/abc/number-to-chinese/number-to-chinese.module';
import { AdLodopModule } from '@delon/abc/lodop/lodop.module';
import { AdQuickMenuModule } from '@delon/abc/quick-menu/quick-menu.module';
import { AdQRModule } from '@delon/abc/qr/qr.module';
import { AdSHFModule } from '@delon/abc/simple-html-form/module';
// charts
import { AdG2BarModule } from '@delon/abc/charts/bar/bar.module';
import { AdG2CardModule } from '@delon/abc/charts/card/card.module';
import { AdG2ChartModule } from '@delon/abc/charts/chart/chart.module';
import { AdG2GaugeModule } from '@delon/abc/charts/gauge/gauge.module';
import { AdG2MiniAreaModule } from '@delon/abc/charts/mini-area/mini-area.module';
import { AdG2MiniBarModule } from '@delon/abc/charts/mini-bar/mini-bar.module';
import { AdG2MiniProgressModule } from '@delon/abc/charts/mini-progress/mini-progress.module';
import { AdG2PieModule } from '@delon/abc/charts/pie/pie.module';
import { AdG2RadarModule } from '@delon/abc/charts/radar/radar.module';
import { AdG2TagCloudModule } from '@delon/abc/charts/tag-cloud/tag-cloud.module';
import { AdG2TimelineModule } from '@delon/abc/charts/timeline/timeline.module';
import { AdG2WaterWaveModule } from '@delon/abc/charts/water-wave/water-wave.module';

const MODULES = [
  AdErrorCollectModule,
  AdFooterToolbarModule,
  AdSidebarNavModule,
  AdDownFileModule,
  AdImageModule,
  AdAvatarListModule,
  AdDescListModule,
  AdEllipsisModule,
  AdGlobalFooterModule,
  AdExceptionModule,
  AdNoticeIconModule,
  AdNumberInfoModule,
  AdPageHeaderModule,
  AdResultModule,
  AdStandardFormRowModule,
  AdTagSelectModule,
  AdTrendModule,
  AdCountDownModule,
  AdSimpleTableModule,
  AdReuseTabModule,
  AdFullContentModule,
  AdXlsxModule,
  AdZipModule,
  AdNumberToChineseModule,
  AdLodopModule,
  AdQuickMenuModule,
  AdQRModule,
  AdSHFModule,
  // charts
  AdG2BarModule,
  AdG2CardModule,
  AdG2ChartModule,
  AdG2GaugeModule,
  AdG2MiniAreaModule,
  AdG2MiniBarModule,
  AdG2MiniProgressModule,
  AdG2PieModule,
  AdG2RadarModule,
  AdG2TagCloudModule,
  AdG2TimelineModule,
  AdG2WaterWaveModule,
];

// endregion

@NgModule({
  imports: [
    AdErrorCollectModule.forRoot(),
    AdFooterToolbarModule.forRoot(),
    AdSidebarNavModule.forRoot(),
    AdDownFileModule.forRoot(),
    AdImageModule.forRoot(),
    AdAvatarListModule.forRoot(),
    AdDescListModule.forRoot(),
    AdEllipsisModule.forRoot(),
    AdExceptionModule.forRoot(),
    AdExceptionModule.forRoot(),
    AdNoticeIconModule.forRoot(),
    AdNumberInfoModule.forRoot(),
    AdPageHeaderModule.forRoot(),
    AdResultModule.forRoot(),
    AdStandardFormRowModule.forRoot(),
    AdTagSelectModule.forRoot(),
    AdTrendModule.forRoot(),
    AdCountDownModule.forRoot(),
    AdSimpleTableModule.forRoot(),
    AdReuseTabModule.forRoot(),
    AdFullContentModule.forRoot(),
    AdXlsxModule.forRoot(),
    AdZipModule.forRoot(),
    AdNumberToChineseModule.forRoot(),
    AdLodopModule.forRoot(),
    AdQuickMenuModule.forRoot(),
    AdQRModule.forRoot(),
    AdSHFModule.forRoot(),
    // charts
    AdG2BarModule.forRoot(),
    AdG2CardModule.forRoot(),
    AdG2ChartModule.forRoot(),
    AdG2GaugeModule.forRoot(),
    AdG2MiniAreaModule.forRoot(),
    AdG2MiniBarModule.forRoot(),
    AdG2MiniProgressModule.forRoot(),
    AdG2PieModule.forRoot(),
    AdG2RadarModule.forRoot(),
    AdG2TagCloudModule.forRoot(),
    AdG2TimelineModule.forRoot(),
    AdG2WaterWaveModule.forRoot(),
  ],
  exports: MODULES,
})
export class DelonABCRootModule {}

@NgModule({ exports: MODULES })
export class DelonABCModule {
  static forRoot(): ModuleWithProviders {
    return { ngModule: DelonABCRootModule };
  }
}
