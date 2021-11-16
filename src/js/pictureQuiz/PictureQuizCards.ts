import { Card } from "../components/Card";
import { Container } from "../Container/Container";
import { pictureQuizImages } from "../defaultPictureQuizImages";
import { pictureQiuzTitles } from "../pictureQuizTitle";
import { utilites } from "../Utilities";

export class PictureQuizCards extends Container {
  public element: HTMLDivElement;

  cardsContainer: Container;

  cards: Card[];

  constructor(className: string) {
    super(className);

    this.cards = this.createCards();

    this.cardsContainer = new Container("artistQuiz-main__cardsContainer", [
      ...this.cards.map((card) => card.element)
    ]);

    this.element = this.cardsContainer.element;

    this.determinateCategory();
    this.addDescriptionToCard();
    this.addImages();
  }

  private addDescriptionToCard() {
    this.cards.forEach((item, index) => {
      item.addHeaderText(pictureQiuzTitles[index]);
    });
    return this;
  }

  private async addImages() {
    this.cards.forEach(async (card, index) => {
      await card.addImage(pictureQuizImages[index]);
    });
  }

  public addTotalScore(score: number) {
    const necessaryCardIndex = +(
      localStorage.getItem("ArtisQuizCategory") ?? 0
    );
    this.cards.forEach((card, index) => {
      if (index === necessaryCardIndex) {
        card.addScore(`${score}`);
        card.addClassName("played");
      }
    });
    return this;
  }

  private createCards(amount = 12) {
    const cards: Card[] = [];
    for (let i = 0; i < amount; i++) {
      const card = new Card("artistQuiz-main__card");
      cards.push(card);
    }
    return cards;
  }

  private async createImages(amount = 12) {
    const images: HTMLImageElement[] = [];
    for (let i = 0; i < amount; i++) {
      const image = await utilites.getImg(pictureQuizImages[i]);
      images.push(image);
    }
    return images;
  }

  public determinateCategory() {
    this.cards.forEach((card) => {
      card.addListener("click", ({ target }) => {
        if (!target) {
          return;
        }
        localStorage.setItem(
          "PictureQuizCategory",
          `${this.cards.indexOf(card)}`
        );
      });
    });
  }

  public showQuestionPage(listener: EventListener) {
    this.cards.forEach((card) => card.addListener("click", listener));
  }
}
