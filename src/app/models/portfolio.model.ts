import Asset from './asset.model';
import Currency from './currency.model';

class Portfolio {
  _id: string;
  name: string;
  amount: number;
  assets: Asset[];
  funded: boolean;
  
  addAsset(currency:Currency, amount:number){
     let exists:boolean = false;
    
     var asset:Asset = new Asset();
     asset.image_url = currency.Currency.toLowerCase();
     asset.market_code = currency.Currency;
     asset.name = currency.CurrencyLong;
     asset.quantity = 0.000045//should be calculated;
     asset.value = amount;

     if(this.assets!=null&&this.assets.length>0){
        this.assets.forEach((element, i) => {
          if(element.market_code===currency.Currency){
            //currency exists in portfolio so we are editing it
            exists = true;
            this.assets.splice(i,1,asset);
            this.amount-=element.value;
            this.amount+=amount;
          }
        });
     }

     if(!exists){
        //currency does not exist so we add it
        if(this.assets==null||this.assets.length<=0){
          this.assets = [];
        }
        this.amount+=amount;
        this.assets.unshift(asset);
     }
  }

  toString(): string{
      return JSON.stringify(this);
  }

}

export default Portfolio;
