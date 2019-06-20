export function stDataAddIndex(data: any[]): any {
  data = data || [];
  data.forEach((ele: any, idx) => (ele._index_ = idx + 1));
  return data;
}
