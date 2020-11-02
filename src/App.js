import React, { Component } from 'react';
import FadeIn from 'react-fade-in';

import Buttonbox from './Box/buttonbox';
import Heading from './Heading/heading';
import Popup from './Popup/popup';

const content = [
  {
    title: 'Front-end developer',
    description: 'Creative, problem solving and fast learning front-end developer in the making. Knows HTML, CSS, Javascript and React.',
  },
  {
    title: 'Graphic designer',
    description: 'Newspaper and magazine designer (print) for many years. Amongst the employers: Egmont, Expressen, Svenska Dagbladet and Dagens Nyheter.',
  },
  {
    title: 'Ultrarunner',
    description: 'Best marathon 3:23 (Berlin), longest distance 90 km (Ultravasan). Running approx 250 km per month, preferably on trails.',
  },
  {
    title: 'Father',
    description: 'Together with my wife I try to spend as much of my free time as possible with my two lovely daughters, born in 2016 and 2018.',
  }
];

const cv_obj = [{
  year_start: 2015,
  year_end: 2017,
  company: 'Egmont Publishing',
  role: 'Designer/Editor',
  description: 'Worked mostly with layout, also photo manipulation and product and byline photography in studio. Magazines: Hus&Hem Trädgård (6 issues/year), Hälsa (12 issues/year), Hus&Hem (15 issues/year), Icakurien (50 issues/year).'
},
{
  year_start: 2007,
  year_end: 2015,
  company: 'Forma Publishing',
  role: 'Designer/Editor',
  description: 'Worked mostly with layout, also photo manipulation and product and byline photography in studio. Responsible for layout templates, advert placement and proofing before print. Magazines: Icakurien (52 issues/year).'
},
{
  year_start: 2001,
  year_end: 2006,
  company: 'SVT Text',
  role: 'Movie Critic',
  description: 'Part time job "on the side". Wrote around 200 reviews.'
},
{
  year_start: 2005,
  year_end: 2006,
  company: 'Expressen',
  role: 'Copy Editor/Layout',
  description: 'Temporary post for 11 months, mostly on entertainment section. Layout manager for the weekly magazine Expressen Fredag '
},
{
  year_start: 2004,
  year_end: 2005,
  company: 'Svenska Dagbladet',
  role: 'Copy Editor/Layout',
  description: 'Temporary post for 11 months, mostly on sport section.'
},
{
  year_start: 2002,
  year_end: 2005,
  company: 'Stockholm university student union',
  role: 'Layout and Photo Manager',
  description: 'Part time (50%). Magazine: Gaudeamus (5 issues/year).'
},
{
  year_start: 2002,
  year_end: 2003,
  company: 'Dagens Nyheter',
  role: 'Copy Editor/Layout',
  description: 'Temporary post for 11 months, in all sections but mostly sport.'
}]

const edu_obj = [{
  year_start: 2019,
  year_end: '',
  school: 'KYH',
  education: 'Front-end developer',
  description: 'Full time, two years.'
},
{
  year_start: 2013,
  year_end: 2014,
  school: 'It\'s Yoga',
  education: 'Ashtanga Yoga Teacher',
  description: 'Weekend school, two terms.'
},
{
  year_start: 2000,
  year_end: 2001,
  school: 'Stockholm university',
  education: 'Cinema Studies',
  description: 'Full time, two terms.'
},
{
  year_start: 1999,
  year_end: 2000,
  school: 'Forsbergs skola',
  education: 'Copywriter',
  description: 'Full time, two terms.'
},
{
  year_start: 1997,
  year_end: 1999,
  school: 'Dalarna university',
  education: 'Graphic Design & Technology',
  description: 'Full time, four terms.'
}]
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
      runningDistance: 276,
      realname: '',
      email: '',
      Message: '',
      submit: 'Send'
    }
  };

  clickHandler = (e) => {
    let event = (e === 99) ? e : e.target.value;
    this.setState({ isTitleRotated: 0, isContentRotated: 0 });
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
      timing = setTimeout(function () {
        this.setState({ hiddenTap: false })
      }.bind(this), 10000);
    } else {
      clearTimeout(timing);
      this.setState({ hiddenTap: true })
    }
  }

  rotateHandler = (i, e) => {
    if (!this.state.isClicked) {
      this.setState({ isClicked: true })
      this.checkClick(true)
    }
    if (e.target.dataset.value) {
      this.setState({ isTitleRotated: i, isContentRotated: i });
    } else {
      this.setState({ isTitleRotated: 0, isContentRotated: 0 });
    };
  };

  hoverHandler = () => {
    this.setState({ isTitleRotated: 0, isContentRotated: 0 });
  }

  render() {
    const { isTitleRotated, isContentRotated } = this.state;
    if (!this.state.isClicked && !timing) this.checkClick()

    let cvcontent = [<span key={8}> EMPLOYMENT</span>]
    let educontent = [<span key={9}>EDUCATION</span>]
    cv_obj.map((cv, i) => {
      return cvcontent.push(`${cv.year_start}–${cv.year_end} ${cv.role} at ${cv.company}\n`)
    })
    edu_obj.map((edu) => {
      return educontent.push(`${edu.year_start}–${edu.year_end} ${edu.education} at ${edu.school}\n`)
    })

    return (
      <div className='title-page' >
        <FadeIn transitionDuration={800}>
          <h1 onMouseOver={this.hoverHandler}>Erik Calmfors</h1>
          {content.map((item, i) =>
            < Heading
              data={i}
              key={i}
              color={i === 2 || i === 3 ? 'rgb(255, 215, 255)' : 'rgb(235, 195, 235)'}
              classNameTitle={isTitleRotated === i + 1 ? 'four-titles rotated' : 'four-titles'}
              classNameContent={isContentRotated === i + 1 ? 'content' : 'content rotated'}
              clicked={this.rotateHandler.bind(this, i + 1)}
              title={item.title}
              content={(i === 2) ? item.description + ` Total ${this.state.runningDistance} km this year, so far.` : item.description}
            />
          )}
        </FadeIn>

        <Buttonbox
          hover={this.hoverHandler.bind(this)}
          clicked={this.clickHandler.bind(this)}
          title1='CONTACT'
          title2='CV'
          title3='PORTFOLIO'
          title4={<a target='_blank' rel='noopener noreferrer' title='My GitHub page'
            href='https://github.com/calmfors'>GITHUB <img src='assets/external-link-symbol.svg' alt='' /></a>}
        />
        <img alt='' onMouseOver={this.hoverHandler} src='assets/erik.png' className='erik'></img>
        <img alt='' src='assets/touch.svg' className={this.state.hiddenTap ? 'tap hidden' : 'tap'}></img>
        <Popup
          className={this.state.hiddenContact ? 'hidden' : 'popup'}
          clicked={() => this.clickHandler(99)}
          content=
          {[<form key='1' method='post'
            onSubmit={this.submitHandler.bind(this)}>
            <span>SAY HELLO</span>Based in Södermalm, Stockholm, Sweden. Please use the form to contact me, or send an email to <a href='mailto:erikcalmfors@outlook.com'>
              erikcalmfors@outlook.com</a><br /><br />
            <label htmlFor='realname'>Name</label>
            <input type='text' name='realname' value={this.state.realname} onChange={this.handleChange.bind(this)} required /><br />
            <label htmlFor='email'>Email</label>
            <input type='email' name='email' value={this.state.email} onChange={this.handleChange.bind(this)} required /><br />
            <label htmlFor='Message'>Message</label>
            <textarea name='Message' rows='3' cols='60' value={this.state.Message} onChange={this.handleChange.bind(this)} required />
            <input className='button' type='submit' name='submit' value={this.state.submit} />
          </form>,
          <a key='2' target='_blank' rel='noopener noreferrer' href='https://www.linkedin.com/in/erik-calmfors-343802b3/' title='My LinkedIn profile'>
            <img alt='Linkedin logo' id='linkedin' src='assets/linkedin.svg' /></a>,
          <a key='3' target='_blank' rel='noopener noreferrer' href='https://github.com/calmfors' title='My GitHub page'>
            <img alt='Github logo' id='git' src='assets/github.svg' /></a>
          ]}
        />

        <Popup
          className={this.state.hiddenCV ? 'hidden' : 'popup'}
          clicked={() => this.clickHandler(99)}
          content={[<div key={3} className='dl-pdf'><a key={4} href='assets/cv_ec.pdf' download><img key={5} src='assets/dl_pdf.svg' alt='' /></a></div>, cvcontent, '\n', educontent, '\n',
          <a key={6} href='assets/cv_ec.pdf'> Click here (or on the icon) to download more detailed pdf-version (in Swedish).</a>, '\n', '\n']}
        />

        <Popup
          className={this.state.hiddenPortfolio ? 'hidden' : 'popup'}
          clicked={() => this.clickHandler(99)}
          content={[
            <a target='_blank' rel='noopener noreferrer' href='http://calmfors.se/soup/' key={1}>
              <div className="portfolio">

                <img src="assets/soup.png" alt="" style={{ "width": "30%", "marginRight": "10px", "border": "1px solid black" }} />
                <div>
                  <span key={2}>SOUP <img src='assets/external-link-symbol.svg' alt='' /></span>
            Food delivery app made with react, styled components and firebase. Individual Project KYH Front-end developer. October 2020.</div>
              </div></a>,
            <a target='_blank' rel='noopener noreferrer' href='http://calmfors.se/quire/' key={3}>
              <div className="portfolio">

                <img src="assets/quire.png" alt="" style={{ "width": "30%", "marginRight": "10px", "border": "1px solid black" }} />
                <div>
                  <span key={4}>QUIRE <img src='assets/external-link-symbol.svg' alt='' /></span>
            Note taking app based on Tiny MCE, Team Project KYH Front-end developer. November 2019.
            </div></div></a>,
            <a target='_blank' rel='noopener noreferrer' href='http://calmfors.se/erikruns/' key={5}>

              <div className="portfolio">
                <img src="assets/erikruns.png" alt="" style={{ "width": "30%", "marginRight": "10px", "border": "1px solid black" }} />
                <div>

                  <span key={6}>ERIK RUNS <img src='assets/external-link-symbol.svg' alt='' /></span>
            Review site for running shoes, Individual Project KYH Front-end developer. October 2019.
            </div>
              </div>

            </a>,

            <img key={7} src='assets/wip.svg' className='wip' alt='' />
          ]}
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
    const params = {
      realname, email, Message,
      required: 'realname,email,Message',
      redirect: '/',
      subject: 'From portfolio',
      recipient: 'erik@calmfors.se',
      missing_fields_redirect: '/'
    }
    const searchParams = Object.keys(params).map((key) => {
      return encodeURIComponent(key) + '=' + encodeURIComponent(params[key]);
    }).join('&');
    const cors_anywhere = 'https://cors-anywhere.herokuapp.com'
    fetch(cors_anywhere + '/http://www.calmfors.se/cgi-bin/FormMail.pl', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
      body: searchParams
    })
      .then((response) => {
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