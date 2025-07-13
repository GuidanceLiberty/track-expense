import _ from 'lodash';

// ✅ Group transactions and return total per type or overall
export const getSum = (transaction, type) => {
  const grouped = _(transaction)
    .groupBy("type")
    .map((objs, key) => {
      if (!type) return _.sumBy(objs, 'amount');
      return {
        type: key,
        color: objs[0].color,
        total: _.sumBy(objs, 'amount'),
      };
    })
    .value();

  return grouped;
};

// ✅ Get labels with percentage for each category
export const getLabels = (transaction) => {
  const amountSum = getSum(transaction, 'type');
  const Total = _.sumBy(amountSum, 'total');

  const percent = _(amountSum)
    .map(obj => _.assign(obj, { percent: (100 * obj.total) / Total }))
    .value();

  return percent;
};

// ✅ Generate chart.js config object
export const chart_Data = (transaction, custom) => {
  let bg = _.uniq(_.map(transaction, a => a.color));
  let dataValue = getSum(transaction);

  const config = {
    data: {
      datasets: [
        {
          data: dataValue,
          backgroundColor: bg,
          hoverOffset: 4,
          borderRadius: 30,
          spacing: 10,
        },
      ],
    },
    options: {
      cutout: 115,
    },
  };

  return custom ?? config;
};

// ✅ Get overall total amount
export const getTotal = (transaction) => {
  return _.sum(getSum(transaction));
};
