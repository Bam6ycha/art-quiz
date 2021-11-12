class Utilites {
  constructor() {}

  public getRandomNumber(min: number, max: number) {
    const random = min + Math.random() * (max + 1 - min);
    return Math.floor(random);
  }

  public async getAuthor(autorNumber: number) {
    const authorsUrl =
      "https://raw.githubusercontent.com/Bam6ycha/image-data/master/images.json";
    const response = await fetch(authorsUrl);
    const authors = await response.json();

    const description = authors[autorNumber];
    return description;
  }

  public creatURLImg(number: number) {
    const imgUrl = `https://raw.githubusercontent.com/Bam6ycha/image-data/master/img/${number}.jpg`;
    return imgUrl;
  }

  public randomNumberGap(category: string) {
    let min = 0;
    let max = 0;
    const categoryNumber = +(localStorage.getItem(category) ?? "0");
    if (categoryNumber === 0) {
      min = 0;
      max = 10;
    }
    if (categoryNumber === 1) {
      min = 10;
      max = 20;
    }
    if (categoryNumber === 2) {
      min = 20;
      max = 30;
    }
    if (categoryNumber === 3) {
      min = 30;
      max = 40;
    }
    if (categoryNumber === 4) {
      min = 40;
      max = 50;
    }
    if (categoryNumber === 5) {
      min = 50;
      max = 60;
    }
    if (categoryNumber === 6) {
      min = 60;
      max = 70;
    }
    if (categoryNumber === 7) {
      min = 70;
      max = 80;
    }
    if (categoryNumber === 8) {
      min = 80;
      max = 90;
    }
    if (categoryNumber === 9) {
      min = 90;
      max = 100;
    }
    if (categoryNumber === 10) {
      min = 100;
      max = 110;
    }
    if (categoryNumber === 11) {
      min = 110;
      max = 120;
    }
    return [min, max];
  }

  public shuffle(array: string[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
}

const utilites = new Utilites();
export { utilites };
