import React, { Component } from 'react';
import Buttonbox from './Box/buttonbox';
import Heading from './Heading/heading';

const content = [
  {
    title: 'Front end developer',
    description: 'Front end ipsum dolor sit amet, consectetur adstrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  },
  {
    title: 'Graphic designer',
    description: 'Graphic designer amet, consectetur adipiscing rcitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  },
  {
    title: 'Ultrarunner',
    description: 'Ultrarunner ipsum dolor sit amet, consectetur nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  },
  {
    title: 'Father',
    description: 'Father ipsum dolor sit amet, consectetur adipiud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  }
];


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isTitleRotated: 0,
      isContentRotated: 0
    }
  };

  clickHandler = (e) => {
    if (e.target.value) alert("CLICKED" + e.target.value);
  };
  rotateHandler = (i, e) => {
    console.log(i + e.target + e.target.dataset.value);
    if (e.target.dataset.value) {
      this.setState({ isTitleRotated: i, isContentRotated: i });
    } else {
      this.setState({ isTitleRotated: 0, isContentRotated: 0 });
    };
  };
  render() {

    return (

      <div className="title-page">
        <h1>
          Erik Calmfors
        </h1>
        {content.map((item, i) =>
          [
            < Heading
              data={i}
              key={i}
              color={i === 2 || i === 3 ? "rgb(255, 215, 255)" : "rgb(235, 195, 235)"}
              className={this.state.isTitleRotated === i + 1 ? "four-titles rotated" : "four-titles"}
              clicked={this.rotateHandler.bind(this, i + 1)}
              title={item.title}
            />,
            < p
              key={i + 1}
              className={this.state.isContentRotated === i + 1 ? "content" : "content rotated"}
              onClick={this.rotateHandler.bind(this, i)}>
              {item.description}
            </p>
          ]
        )}

        <Buttonbox
          clicked={this.clickHandler.bind(this)}
          title1="CV"
          title2="CONTACT"
          title3={<a target='_blank' rel="noopener noreferrer" title='Link to my github' href='https://github.com/calmfors'>GITHUB</a>}
        />
        <img alt="" src="erik.png"></img>

      </div>
    );
  };
};

export default App;