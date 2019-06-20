import { SFComponent } from '@delon/form';

export const _searchChange = (
  _sf: SFComponent,
  _searchQuery: any,
  pType: string,
  pValue: any,
) => {
  _searchQuery = _searchQuery || {};
  _searchQuery[pType] = (pValue || []).join(',');
  const _devRefresh = () => {
    if (_sf.schema.properties.hasOwnProperty('book_id'))
      _sf.setValue(`/book_id/default`, null);
    if (_sf.schema.properties.hasOwnProperty('model_id'))
      _sf.setValue(`/model_id/default`, null);
    // if (_sf.schema.properties.hasOwnProperty('factory'))
    //   _sf.setValue(`/factory/default`, null);
  };
  if (['org_install_id', 'pro_id'].indexOf(pType) > -1) {
    if (_sf.schema.properties.hasOwnProperty('dev_id'))
      _sf.setValue(`/dev_id/default`, null);
    _devRefresh();
  }
  if (pType == 'dev_id') _devRefresh();
};
