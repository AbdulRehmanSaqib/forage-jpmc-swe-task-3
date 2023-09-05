import { ServerRespond } from './DataStreamer';

export interface Row {
  ratio: number;
  lower_bound: number;
  upper_bound: number;
  trigger_alert: number | undefined; // Use camelCase here
  price_abc: number; // Use underscores here
  price_def: number; // Use underscores here
  timestamp: Date;
}

export class DataManipulator {
  static generateRow(serverResponds: ServerRespond[]) {
    const [abc, def] = serverResponds;
    
    const priceABC = abc.top_ask && abc.top_ask.price || 0;
    const priceDEF = def.top_ask && def.top_ask.price || 0;
    
    const ratio = priceABC / priceDEF;
    
    const lowerBound = 0.95;
    const upperBound = 1.05; 
    
    let triggerAlert;
    if (ratio > upperBound || ratio < lowerBound) {
      triggerAlert = ratio;
    }

    return {
      ratio,
      lower_bound: lowerBound, // Use underscores here
      upper_bound: upperBound, // Use underscores here
      trigger_alert: triggerAlert, // Use camelCase here
      price_abc: priceABC, // Use underscores here
      price_def: priceDEF, // Use underscores here
      timestamp: abc.timestamp
    };
  }
}
