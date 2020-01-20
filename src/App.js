import React, { Component } from 'react';
import Buttonbox from './Box/buttonbox';
import Heading from './Heading/heading';
import Popup from './Popup/popup';

const content = [
  {
    title: 'Front end developer',
    description: 'Creative, problem solving and fast learning front end developer in the making. Knows HTML, CSS, Javascript and React.',
  },
  {
    title: 'Graphic designer',
    description: 'Worked with newspaper and magazine layout for many years. Amongst the employers: Egmont, Expressen, Svenska Dagbladet and Dagens Nyheter.',
  },
  {
    title: 'Ultrarunner',
    description: 'Running approx 250 km each month, preferable on trails. Fastest marathon 3:23 (Berlin), longest distance 90 km (Ultravasan).',
  },
  {
    title: 'Father',
    description: 'Together with my wife I try to spend as much of my free time as possible with my two lovely daughters, born in 2016 and 2018.',
  }
];

// const cv_obj = [{
//   year_start: 2015, year_end: 2017, company: 'Egmont', role: 'Editor / Designer', string: `Hus & Hem Trädgård(6 nr / år), Hälsa
//     (12 nr / år), Hus & Hem(15 nr / år), Icakurien(50 nr / år) .Fotografering av produkter och
// mindre bylinebilder i studio.`}]
//cv_obj.map(obj => )
const cv = `ARBETSLIVSERFARENHET 2015–2017(Egmont) Redigerare / formgivare Hus & Hem Trädgård(6 nr / år), Hälsa (12 nr / år), Hus & Hem(15 nr / år), Icakurien(50 nr / år).Fotografering av produkter ochmindre bylinebilder i studio.`

//             2007–2015(Forma) Redigerare / teknisk redaktör av veckotidningen Icakuriren.Ansvar
// för mallar, annonsplaceringar mm samt fotograf av bla testade produkter.
//             2001–2006 Filmrecensent för SVT Text.
//             2005–2006 Heltidsvikariat som dagredigerare på Expressen, november 2005 till augusti 2006.
// Främst på kulturavdelningen.Layoutansvarig för Expressens veckobilaga Fredag maj till
// augusti 2006.
// 2004–2005 Heltidsvikariat som redigerare på Svenska Dagbladet, juni 2004 till juni 2005.
// Främst sportavdelningen men även inhopp på kultur - och nyhetsavdelningen.
//             2002–2005 Halvtidstjänst som formgivnings - och fotoansvarig för Stockholms studentkårs
// tidning, Gaudeamus.Totalt 21 nummer.
//             2004 Dataregistrerare för Manpower på Skatteverket, maj.
//             2002–2003 Heltidsvikariat som redigerare på Dagens Nyheter, juni 2002 till augusti 2003.
// I början på kulturavdelningen men senare framförallt på sport - men även nyhetsavdelningen.
//             2002 Korrekturläsare / redigerare för Universals skivkatalog(intern).
//             2000–2002 Formgivnings - och fotoansvarig för humanistiska föreningens tidning, Känguru.
//             1999–2001 Filmrecensent och skribent för cinema.se och papperstidningen cinema.
//             1998–1999 Bildansvarig för Borlänge studentkårs tidning, Kårsetten.Ansvarig för Borlänge
// studentkårs filmvisning.
//   UTBILDNINGAR
// 2013–2014 Yogalärarutbildning, ashtanga, helg, 200 h, It’s yoga Stockholm.
//             2000–01 Filmvetenskaplig grundkurs 40 p(35), Stockholms universitet.
//             1999–2000 Forsbergs skola – copywriter dagskola, heltid, inkl.en vecka praktik under våren
// 2000 som AD på reklambyrån Harry.
//             1999 Åtta veckor praktik under sommaren på filmtidningen cinema – text och layoutarbeten
// samt viss bildbehandling.
//             1997–99 Grafisk teknologi 120 p(80), högskolan Dalarna, Borlänge.
//             1996–97 Militärtjänst som väderbiträde 11 månader, F - 17 Ronneby.
//             1993–96 Naturvetenskapliga programmet, Västerviks gymnasium.
//   ÖVRIGT
// • Mycket goda kunskaper i Indesign, Photoshop, Illustrator på PC och Mac.
// • Goda kunskaper i Officepaketet.
// • Spridda större och mindre grafiska projekt från och med 1994.
// • Språkkunskaper: engelska, spanska(lite), tyska(lite).
// • Innehar B - körkort.
//   REFERENSER
// Lämnas på begäran.
//   CV
// Erik Calmfors, Marmorgatan 2, 11867 Stockholm, 070 - 7202168, 1977 - 03 - 10)

const API = 'https://www.strava.com/api/v3/athletes/32364324/stats?page=1&per_page=30'
const REFRESH = 'https://www.strava.com/api/v3/oauth/token?'
let token = localStorage.getItem('token')
let timing

class App extends Component {

  componentDidMount() {
    this.getDistance(token)
  }

  getDistance = (token) => {
    let bearer = 'Bearer ' + token;
    let obj = {
      method: 'GET',
      headers: {
        'Authorization': bearer,
      }
    }
    fetch(API, obj)
      .then(response => response.json())
      .then(data => {
        console.log('API is working ' + data.ytd_run_totals.distance)
        this.setState({ runningDistance: Math.round(data.ytd_run_totals.distance / 1000) })
      })
      .catch((error) => this.getToken());
  }

  getToken = () => {
    const CLIENT = 'client_id=42574&'
    const SECRET = 'client_secret=c1dacfaa3c856e2b67b534c25f9da6a6a143fd7d&'
    const GRANT = 'grant_type=refresh_token&refresh_token=3ab76bc027336862464290d43ed857e27c9451cf'
    fetch(REFRESH + CLIENT + SECRET + GRANT, { method: 'POST' })
      .then(response => response.json())
      .then(data => {
        console.log('token refreshed')
        token = data.access_token
        localStorage.setItem('token', token)
        this.getDistance(token)
      })
      .catch(e => console.log('token not refreshed'))
  }

  constructor(props) {
    super(props);
    this.state = {
      isTitleRotated: 0,
      isContentRotated: 0,
      hiddenCV: true,
      hiddenContact: true,
      hiddenPortfolio: true,
      isClicked: false,
      hiddenTap: true,
      runningDistance: 140,
      realname: '',
      email: '',
      Message: '',
      submit: 'Submit'
    }
  };

  clickHandler = (e) => {
    let event = (e === 99) ? e : e.target.value;
    switch (event) {
      case '1':
        this.setState({ hiddenCV: true, hiddenContact: !this.state.hiddenContact, hiddenPortfolio: true })
        break;
      case '2': this.setState({ hiddenCV: !this.state.hiddenCV, hiddenContact: true, hiddenPortfolio: true })
        break;
      case '3': this.setState({ hiddenCV: true, hiddenContact: true, hiddenPortfolio: !this.state.hiddenPortfolio })
        break;
      case '4':
        window.open('https://github.com/calmfors', '_blank');
        break;
      default: this.setState({ hiddenCV: true, hiddenContact: true, hiddenPortfolio: true });
    }
  };

  checkClick = (e) => {
    if (!e) {
      console.log('timer is set')
      timing = setTimeout(function () {
        this.setState({ hiddenTap: false })
      }.bind(this), 7000);
    } else {
      console.log('timer should be cleared')
      clearTimeout(timing);
      this.setState({ hiddenTap: true })

    }
  }

  rotateHandler = (i, e) => {
    // this.setState({ hiddenTap: true })
    if (!this.state.isClicked) {
      console.log('rotate is making it true')
      this.setState({ isClicked: true })
      this.checkClick(true)
    }
    if (e.target.dataset.value) {
      this.setState({ isTitleRotated: i, isContentRotated: i });
    } else {
      this.setState({ isTitleRotated: 0, isContentRotated: 0 });
    };
  };

  render() {
    const { isTitleRotated, isContentRotated } = this.state;
    if (!this.state.isClicked && !timing) this.checkClick()
    return (
      <div className='title-page'>
        <h1>
          Erik Calmfors
        </h1>
        {content.map((item, i) =>
          < Heading
            data={i}
            key={i}
            color={i === 2 || i === 3 ? 'rgb(255, 215, 255)' : 'rgb(235, 195, 235)'}
            classNameTitle={isTitleRotated === i + 1 ? 'four-titles rotated' : 'four-titles'}
            classNameContent={isContentRotated === i + 1 ? 'content' : 'content rotated'}
            clicked={this.rotateHandler.bind(this, i + 1)}
            title={item.title}
            content={(i === 2) ? item.description + ` Total ${this.state.runningDistance} km this year. So far.` : item.description}
          />
        )}
        <Buttonbox
          clicked={this.clickHandler.bind(this)}
          title1='CONTACT'
          title2='CV'
          title3='PORTFOLIO'
          title4={<a target='_blank' rel='noopener noreferrer' title='Link to my github' href='https://github.com/calmfors'>GITHUB <img src='external-link-symbol.svg' alt=''></img></a>}
        />
        <img alt='' src='erik.png' className='erik'></img>
        <img alt='' src='touch.svg' className={this.state.hiddenTap ? 'tap hidden' : 'tap'}></img>
        <Popup
          className={this.state.hiddenCV ? 'hidden' : 'popup'}
          clicked={() => this.clickHandler(99)}
          content={cv} />
        <Popup
          className={this.state.hiddenContact ? 'hidden' : 'popup'}
          clicked={() => this.clickHandler(99)}
          content={
            <form method='post'
              onSubmit={this.submitHandler.bind(this)}>
              Based in Södermalm, Stockholm, Sweden. Please use this form to contact me, or send an email to erikcalmfors@outlook.com<br /><br />
              <label htmlFor='realname'>Name</label>
              <input type='text' name='realname' id='realname' value={this.state.realname} onChange={this.handleChange.bind(this)} required /><br />
              <label htmlFor='email'>Email</label>
              <input type='email' name='email' id='email' value={this.state.email} onChange={this.handleChange.bind(this)} required /><br />
              <label htmlFor='Message'>Message</label>
              <textarea name='Message' rows='3' cols='60' id='Message' value={this.state.Message} onChange={this.handleChange.bind(this)} required></textarea>
              <input type='submit' name='submit' value={this.state.submit} className='button' />
            </form>
          }
        />
        <Popup
          className={this.state.hiddenPortfolio ? 'hidden' : 'popup'}
          clicked={() => this.clickHandler(99)}
          content={<img src='wip.svg' alt='' />}
        />
      </div >
    );
  };

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value })
  }

  submitHandler(e) {
    e.preventDefault();
    const { realname, email, Message } = this.state;
    const params = { realname, email, Message, required: 'realname,email,Message', redirect: '/', subject: 'From portfolio', recipient: 'erik@calmfors.se', missing_fields_redirect: '/' }
    const searchParams = Object.keys(params).map((key) => {
      return encodeURIComponent(key) + '=' + encodeURIComponent(params[key]);
    }).join('&');
    console.log(searchParams)
    const cors_anywhere = 'https://cors-anywhere.herokuapp.com'
    fetch(cors_anywhere + '/http://www.calmfors.se/cgi-bin/FormMail.pl', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
      body: searchParams
    })
      .then((response) => {
        console.info('Response?');
        this.resetForm();
      });
  }

  resetForm() {
    this.setState({ realname: '', email: '', Message: '', submit: 'Thank you!' })
    setTimeout(function () {
      this.setState({ submit: 'Submit' })
    }.bind(this), 4000);
  }
};

export default App;