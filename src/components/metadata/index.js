import {Lightning} from "wpe-lightning-sdk";

export default class Metadata extends Lightning.Component {
    static _template() {
        return {
          flex: {
            direction: 'column',
          },
          Title: {
            text: {
              text: 'title',
              fontSize: 46,
              fontFace: "SourceSansPro-Bold",
            }
          },
          Genre: {
            // Gradient based on TMDB logo colors
            colorLeft: 0xff8ecea2,
            colorRight: 0xff03b3e4,
            text: {
              text: 'genre',              
              fontSize: 26,
              fontFace: "SourceSansPro-Regular",
            }
          }
        };
    }

    set movie(v) {
        this.patch({
          Title: {
            text: {
              text: v.title
            }
          },
          Genre: {
            text: {
              text: v.genres.join(' | ')
            }
          },
        })
    }

}