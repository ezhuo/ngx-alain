import { OnInit, OnDestroy, Injector } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { SFSchema, SFUISchema } from '@delon/form';
import { SimpleTableColumn } from '@delon/abc';

import { InjectorControl } from './injector.control';
import { AppFunc } from './app.func';
import { AppCase } from './app.case';

export class AppControl extends InjectorControl implements OnInit, OnDestroy {
    constructor(protected injector: Injector) {
        super(injector);

        this.___appFunc = new AppFunc(this);
        this.___appCase = new AppCase(this);
    }

    // ----------------------------------------

    ngOnInit() {
        super.ngOnInit();
    }

    ngOnDestroy() {
        super.ngOnDestroy();
        this.___appFunc = null;
        this.___appCase = null;
        // 清空其它的
        for (const idx of Object.keys(this)) {
            if (idx && idx.indexOf('___') > -1) {
                this[idx] = null;
            }
        }
    }

    /**
     * 基础处理类
     */
    protected ___appFunc: AppFunc;

    /**
     * 业务处理类
     */
    protected ___appCase: AppCase;

    /**
     * 当前页面的参数
     */
    protected ___pageParams: any = {};

    // ----------------------------------------

    /**
     * 主要的URL
     */
    protected ___primaryURL = '';

    /**
     * 主键KEY
     */
    protected ___primaryKey = 'id';

    /**
     * 主键值
     */
    protected ___primaryValue: any = null;

    // ----------------------------------------

    /**
     * 主要表单
     */
    protected ___mainForm: FormGroup;

    /**
     * 主要表单的列
     */
    protected ___mainTableColumns: SimpleTableColumn[];

    /**
     * 表格附加参数
     */
    public ___mainTableParams: any = {};

    /**
     * 主要表单值
     */
    protected ___formData: any = {};

    /**
     * modal对话框中的参数传递
     */
    protected ___modalParams: any = {};

    // ----------------------------------------

    /**
     * 当前编辑业务的数据结构
     */
    protected ___mainSchema: SFSchema;

    /**
     * 当前编辑业务的数据结构的排序
     */
    protected ___mainSchemaOrder: any[];

    /**
     * 当前编辑业务的数据结构的 UI
     */
    protected ___mainSchemaUi: SFUISchema;

    /**
     * 查询业务的数据结构
     */
    protected ___searchSchema: SFSchema;

    /**
     * 查询业务的数据结构的排序
     */
    protected ___searchSchemaOrder: any[];

    /**
     * 查询业务的数据结构的 UI
     */
    protected ___searchSchemaUi: SFUISchema;

    // --------------------------------------

    get appCase() {
        return this.___appCase;
    }

    get appBase() {
        return this.___appFunc;
    }

    get primaryURL() {
        return this.___primaryURL;
    }

    set primaryURL(value) {
        this.___primaryURL = value;
    }

    get primaryKey() {
        return this.___primaryKey;
    }

    set primaryKey(value) {
        this.___primaryKey = value;
    }

    get primaryValue() {
        return this.___primaryValue;
    }

    set primaryValue(value) {
        this.___primaryValue = value;
    }

    get pageParams() {
        return this.___pageParams;
    }

    set pageTitle(value) {
        this.___pageParams.title = value;
        this.titleSrv.default = value;
    }

    get pageTitle() {
        let next = this.activeRoute;
        if (!this.___pageParams.title) {
            while (next.firstChild) next = next.firstChild;
            const data = (next.snapshot && next.snapshot.data) || {};
            this.___pageParams.title = data.title;
        }

        if (!this.___pageParams.title) {
            const menus = this.menuSrv.getPathByUrl(this.route.url);
            if (!menus || menus.length <= 0) return '';
            const item = menus[menus.length - 1];
            this.___pageParams.title = item.text;
        }

        return this.___pageParams.title;
    }

    set mainForm(value) {
        this.___mainForm = value;
    }

    get mainForm() {
        return this.___mainForm;
    }

    get mainTableParams() {
        this.___mainTableParams = this.___mainTableParams || {};
        if (!this.___mainTableParams.hasOwnProperty('ps')) {
            this.___mainTableParams.ps = this.configSrv.define.table_page_size;
        }
        return this.___mainTableParams;
    }

    set mainSchema(value) {
        this.___mainSchema = value;
    }

    get mainSchema() {
        return this.___mainSchema;
    }

    set mainSchemaOrder(value) {
        this.___mainSchemaOrder = value;
    }

    get mainSchemaOrder() {
        return this.___mainSchemaOrder;
    }

    set mainSchemaUi(value) {
        this.___mainSchemaUi = value;
    }

    get mainSchemaUi() {
        return this.___mainSchemaUi;
    }

    set searchSchema(value) {
        this.___searchSchema = value;
    }

    get searchSchema() {
        return this.___searchSchema;
    }

    get searchSchemaOrder() {
        return this.___searchSchemaOrder;
    }

    set searchSchemaOrder(value) {
        this.___searchSchemaOrder = value;
    }

    set searchSchemaUi(value) {
        this.___searchSchemaUi = value;
    }

    get searchSchemaUi() {
        return this.___searchSchemaUi;
    }

    set formData(value) {
        this.___formData = value;
    }

    get formData() {
        return this.___formData;
    }

    set modalParams(value) {
        this.___modalParams = value;
    }

    get modalParams() {
        return this.___modalParams;
    }

    set mainTableColumns(value) {
        this.___mainTableColumns = value;
    }

    get mainTableColumns() {
        return this.___mainTableColumns;
    }

    // -- init -----------------------------------------

    /**
     * 初始化
     */
    protected __init(url: string, key: any, params?: any) {
        this.primaryURL = url;
        this.primaryKey = key;
    }
}
