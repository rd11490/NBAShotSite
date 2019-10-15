import {Injectable} from "@angular/core";
import { ExportToCsv } from 'export-to-csv';
import {RealAdjustedFourFactors} from "../models/fourfactors.models";

const options = {
  filename: 'FourFactorsRAPM',
  fieldSeparator: ',',
  quoteStrings: '"',
  decimalSeparator: '.',
  showLabels: true,
  showTitle: true,
  title: 'FourFactorsRAPM',
  useTextFile: false,
  useBom: true,
  useKeysAsHeaders: true,
  // headers: ['Column 1', 'Column 2', etc...] <-- Won't work with useKeysAsHeaders present!
};

@Injectable()
export class DownloadCSV {


  constructor() { }

  public exportAsCSV(data: Array<RealAdjustedFourFactors>): void {
    const csvExporter = new ExportToCsv(options);
    csvExporter.generateCsv(data);
  }


}

