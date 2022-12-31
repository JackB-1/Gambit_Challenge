import { constants } from 'buffer';
import { get } from 'http';
import { realHandler, integerHandler, signalQuality, longHandler} from './parsefunctions.js';

const fileUrl = 'http://tuftuf.gambitlabs.fi/feed.txt';

const list1 = [];
const list2 = [];
const value = [];
const list = [];
var dict = {};

get(fileUrl, (res) => {
let data = '';

res.on('data', (chunk) => {
    data += chunk;
});


res.on('end', () => {
    const lines = data.split('\n');
    for (const line of lines) {
        const datan = line.split(':');
        const nr = datan[0];
        var datat = parseInt(datan[1]);
        list1.push(nr);
        list2.push(datat);
        const binaryString = datat.toString(2);
        value.push(binaryString);
    }
  dict["Flow Rate"] = realHandler(value[1], value[2]);
  dict["Energy Flow Rate"] = realHandler(value[3], value[4]);
  dict["Velocity "] = realHandler(value[5], value[6]);
  dict["Fluid sound speed"] = realHandler(value[7], value[8]);
  dict["Positive accumulator"] = longHandler(value[9], value[10]);
  dict["Positive decimal fraction"] =realHandler(value[11], value[12]);
  dict["Negative accumulator"] =longHandler(value[13], value[14]);
  dict["Negative decimal fraction"] =realHandler(value[15], value[16]);
  dict["Positive energy accumulator"] =longHandler(value[17], value[18]);
  dict["Positive energy decimal fraction"] =realHandler(value[19], value[20]);
  dict["Negative energy accumulator"] =longHandler(value[21], value[22]);
  dict["Negative energy decimal fraction"] =realHandler(value[23], value[24]);
  dict["Net accumulator"] =longHandler(value[25], value[26]);
  dict["Net decimal fraction"] =realHandler(value[27], value[28]);
  dict["Net energy accumulator"] =longHandler(value[29], value[30]);
  dict["Net energy decimal fraction"] =realHandler(value[31], value[32]);
  dict["Temperature #1/inlet"] =realHandler(value[33], value[34]);
  dict["Temperature #2/outlet"] =realHandler(value[35], value[36]);
  dict["Analog input AI3"] =realHandler(value[37], value[38]);
  dict["Analog input AI4"] =realHandler(value[39], value[40]);
  dict["Analog input AI5"] =realHandler(value[41], value[42]);
  dict["Current input at AI3"] =realHandler(value[43], value[44]);
  dict["Current input at AI4"] =realHandler(value[45], value[46]);
  dict["Current input at AI5"] =realHandler(value[47], value[48]);
  dict["System password"] = "null"
  dict["Password for hardware"] ="null"
  dict["Calendar(date and time)"] ="null"
  dict["Day + Hour for Auto - Save"] ="null"
  dict["Key to input"] =integerHandler(value[59]);
  dict["Go to Window"] =integerHandler(value[60]);
  dict["LCD Back - lit lights for number of seconds"] =integerHandler(value[61]);
  dict["Times for the beeper"] =integerHandler(value[62]);
  dict["Pulses left for OCT"] =integerHandler(value[63]);
  dict["Error Code"] = "null"
  dict["PT100 resistance of inlet"] =realHandler(value[77], value[78]);
  dict["PT100 resistance of outlet"] =realHandler(value[79], value[80]);
  dict["Total travel time"] =realHandler(value[81], value[82]);
  dict["Delta travel time"] =realHandler(value[83], value[84]);
  dict["Upstream travel time"] =realHandler(value[85], value[86]);
  dict["Downstream travel time"] =realHandler(value[87], value[88]);
  dict["Output current"] =realHandler(value[89], value[90]);
  var templist = signalQuality(value[92])
  dict["Working step"] = templist[0]
  dict["Signal Quality"] =templist[1]
  dict["Upstream strength"] =integerHandler(value[93]);
  dict["Downstream strength"] =integerHandler(value[94]);
  dict["Language used in user interface"] =integerHandler(value[96]);
  dict["Rate of measured/calculated travel time"] =realHandler(value[97], value[98]);
  dict["Reynolds number"] =realHandler(value[99], value[100]);
  console.log("Data parsed.");
  console.log("Dictionary format: \n\n", dict);
  const json_output = JSON.stringify(dict);
  console.log("JSON format: \n\n", json_output);
});

}).on("error", (err) => {
    console.log("Error: " + err.message);
    });

