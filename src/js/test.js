// const wrapper = document.getElementById('#wrapper');
// const arrBig = [];
// const arrSmall = [];
// let isNoPair = false;
// let lastBig = false;
//
// const commonPush = arr => {
//   const elem = arr[0];
//   if (elem) {
//     wrapper.appendChild(elem);
//     arr.pop();
//     return true;
//   }
//
//   return false;
// }
//
// const pushToBigArr = () => {
//   if (!commonPush(arrBig)) {
//     pushToSmallArr();
//   } else {
//     lastBig = true;
//   }
// }
//
// const pushToSmallArr = () => {
//   if (!commonPush(arrSmall)) {
//     pushToBigArr();
//   } else {
//     lastBig = false;
//     isNoPair = !isNoPair;
//   }
// }
//
// let start = 0;
// const mixDumElems = () => {
//   if (start < 2) {
//     pushToBigArr();
//     start++;
//   } else {
//     if (lastBig || isNoPair) {
//       pushToSmallArr();
//     } else {
//       pushToBigArr();
//     }
//   }
//
//   if (arrBig.length || arrSmall.length) {
//     mixDumElems();
//   }
// }
