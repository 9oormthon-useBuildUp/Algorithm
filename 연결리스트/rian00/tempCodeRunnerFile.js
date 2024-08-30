for (let i = 0; i < num; i++) {
//   const met = info[i][0];
//   const insertText = met === "P" ? info[i].split(" ")[1] : null;
//   console.log(insertText);
//   switch (met) {
//     case "L":
//       if (cursor - 1 >= 0) cursor--;
//       break;
//     case "D":
//       if (cursor + 1 <= num) cursor++;
//       break;
//     case "B":
//       str = str.slice(cursor - 1, 1);
//       console.log(str);
//       break;
//     case "P":
//       str = str.slice(0, cursor) + insertText + str.slice(cursor);
//       console.log(str);
//       break;
//   }
// }