export class Categorie {

  public animateState:string;

  constructor(public id: number, public name: string, public children: Array<Object>) {
    this.animateState = 'inactif';
  }

  // public toggleAnimation() {
  //   this.animateState = this.animateState === 'inactif' ? 'active' : 'inactif' ;
  //   console.log(this.animateState);
  // }

}
