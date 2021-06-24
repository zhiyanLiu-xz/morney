import dayjs from 'dayjs';
import clone from '@/lib/clone';
import store from '@/store';

function groupedList(recordAt:string,type:string) {
  const recordList = store.state.recordList
  const newRecordAt = dayjs(recordAt).format('YYYY-MM')
  const newList = clone(recordList)
    .filter(r => r.type === type)
    .filter(r=>dayjs(r.createdAt).format('YYYY-MM')===newRecordAt)
    .sort((a, b) => dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf());
  if (newList.length === 0) {return [];}
  // eslint-disable-next-line no-undef
  type Result = { title: string, total?: number, items: RecordItem[] }[]
  const result: Result = [{title: dayjs(newList[0].createdAt).format('YYYY-MM-DD'), items: [newList [0]]}];
  for (let i = 1; i < newList.length; i++) {
    const current = newList[i];
    const last = result[result.length - 1];
    if (dayjs(last.title).isSame(dayjs(current.createdAt), 'day')) {
      last.items.push(current);
    } else {
      result.push({title: dayjs(current.createdAt).format('YYYY-MM-DD'), items: [current]});
    }
  }
  result.map(group => {
    group.total = group.items.reduce((sum, item) => {
      return sum + item.amount;
    }, 0);
  });
  return result;
}
export default groupedList