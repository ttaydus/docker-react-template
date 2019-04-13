import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: [],
      id: "",
      title: "",
      priority: "",
      status: ""
      //   { title: 'groceries', priority: 'medium', status: 'Upcoming'},
      //   { title: 'clean', priority: 'low', status: 'inAction'},
      //   { title: 'play', priority: 'high', status: 'Finito'},
      //   // { title: 'groceries', priority: 'medium', status: 'Upcoming'},
      //   // { title: 'clean', priority: 'low', status: 'inAction'},
      //   // { title: 'play', priority: 'high', status: 'Finito'},
      //   // { title: 'groceries', priority: 'medium', status: 'Upcoming'},
      //   // { title: 'clean', priority: 'low', status: 'inAction'},
      //   // { title: 'play', priority: 'high', status: 'Finito'},
      //   // { title: 'anotherTask', priority: 'low', status: 'inAction'}
      // ],
      // title: '',
      // priority: ''
    };

    this.getCards = this.getCards.bind(this);
    this.createCards = this.createCards.bind(this);

    this.getCards();
    this.createCards();


  }

  getCards() {
    fetch('/api/cards')
      .then((res) => { 
        console.log('res', res) 
        return res.json() })
      .then((body) => {
        console.log('body', body)
        this.setState({ cards: body });
      })
  }

  createCards() {
    const s = this.state;
    const newCard = {
      title: s.title,
      priority: s.priority,
      status: s.status
    };
    const headers = { 'Content-Type': 'application/json' };
    fetch('/api/cards', { method: 'POST', body: JSON.stringify(newCard), headers })
      .then((res) => {
        return fetch('/api/cards')
          .then((res) => { return res.json(); })
          .then((body) => { this.setState({ cards: body }); });
      }) 
  }

  // delete = title => {
  //   const cards = this.state.cards.filter(card => title !== card.title);
  //   this.setState({ cards });
  // }


  delete = id => {
    let data = { useMe: id };
    const headers = { 'Content-Type': 'application/json' };
    fetch('/api/cards/delete', { method: 'POST', body: JSON.stringify(data), headers })
    .then((res) => {
      return fetch('/api/cards')
        .then((res) => { return res.json(); })
        .then((body) => { this.setState({ cards: body }); });
    }) 
  }


  handleSubmit = e => {
    e.preventDefault();
    const cards = this.state.cards;
    cards.push({ title: this.state.title, priority: this.state.priority, status: this.state.status });
    this.setState({ cards });
  }

  handleChange = e => {
    const name = e.target.name;
    this.setState({ [name]: e.target.value })
  }

  render() {
    const { cards } = this.state;
    const filterUpcoming = cards.filter(cards => cards.status === 'Upcoming');
    const filterInAction = cards.filter(cards => cards.status === 'inAction');
    const filterFinito = cards.filter(cards => cards.status === 'Finito');

    return(

    <div className="entireBrowser">
      
      <div id="pageHeader">
        <h1>
          Task Arranger
        </h1>
      </div>

      <div className="app">
      
        <div className="columns" id="Upcoming">
          <div className='columnHead'>
          Upcoming
          </div>
          <div className='allTasks'>
            {filterUpcoming
            .map(card => (
              <Card
                id={card.id}
                title={card.title}
                priority={card.priority}
                delete={this.delete}
              />
            ))}
          </div>
        </div>
        
        <div className="columns" id="inAction">
          <div className='columnHead'>
          inAction
          </div>
          <div className='allTasks'>
            {filterInAction
            .map(card => (
              <Card
                id={card.id}
                title={card.title}
                priority={card.priority}
                delete={this.delete}
                />
            ))}
          </div>
        </div>

        <div className="columns" id="Finito">
          <div className='columnHead'>
          Finito
          </div>
          <div className='allTasks'>
            {filterFinito
            .map(card => (
              <Card
                id={card.id}
                title={card.title}
                priority={card.priority}
                delete={this.delete}
                />
            ))}
          </div>
        </div>
      </div>

      <div className='submit' >
          <form className="listen" onSubmit={this.createCards}>
            
            <label>
              Title:
              <input name='title' onChange={this.handleChange} type='text' />
            </label>

            <label>
              Priority:
              <input name='priority' onChange={this.handleChange} type='text' />    
            </label>

            <label>
              Status:
              <input name='status' onChange={this.handleChange} type='text' />  
            </label>            
            
            <input id='submitButton' type='submit' />
          </form>
      </div>

    </div>

    )
  }
}

function Card(props) {
  //console.log('props', props);
  return (
    <div className='specificTask'>
      task: {props.title} <br></br>
      priority: {props.priority}
      <button className='' onClick={() => props.delete(props.id)}>Delete</button>
    </div>
  );
}

export default App;

// RAYMOND SAMPLE #1


// import React, { Component } from 'react';
// import logo from './logo.svg';
// import './App.css';

// class App extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       counters: 0
//     };
//   }

//   addCounter = () => {
//     this.setState({ counters: this.state.counters + 1 });
//   };

//   renderCounters = () => {
//     const counters = [];
//     for (var i = 0; i < this.state.counters; i++) {
//       counters.push(<Counter />);
//     }
//     return counters;
//   };

//   render() {
//     return (
//       <div>
//         <button onClick={this.addCounter}>Add Counter</button>
//         {this.renderCounters()}
//       </div>
//     );
//   }
// }

// class Counter extends Component {
//   constructor(props) {
//     super(props);
//     this.state = { count: 0 };
//   }

//   count = () => {
//     return 5 + 5;
//   };

//   increment = () => {
//     this.setState({ count: this.state.count + 1 });
//   };

//   decrement = () => {
//     this.setState({ count: this.state.count - 1 });
//   };

//   render() {
//     return (
//       <div>
//         {this.state.count}
//         <button onClick={this.increment}>Increment</button>
//         <button onClick={this.decrement}>Decrement</button>
//       </div>
//     );
//   }
// }

// export default App;


// RAYMOND SAMPLE #2


// import React, { Component } from 'react';
// import logo from './logo.svg';
// import './App.css';

// class App extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       films: [
//         { title: 'Jumanji', director: 'oh fuck' },
//         { title: 'Titanic', director: 'oh brother' }
//       ],
//       title: '',
//       director: ''
//     };
//   }

//   handleSubmit = e => {
//     e.preventDefault();
//     const films = this.state.films;
//     films.push({ title: this.state.title, director: this.state.director });
//     this.setState({ films });
//   };

//   handleChange = e => {
//     const name = e.target.name;
//     this.setState({ [name]: e.target.value });
//   };

//   balete = title => {
//     const films = this.state.films.filter(film => title !== film.title);
//     this.setState({ films });
//   };

//   render() {
//     const { films } = this.state;

//     return (
//       <div>
//         <form onSubmit={this.handleSubmit}>
//           <input name="title" onChange={this.handleChange} type="text" />
//           <input name="director" onChange={this.handleChange} type="text" />
//           <input type="submit" />
//         </form>
//         {films.map(film => (
//           <Film
//             title={film.title}
//             director={film.director}
//             balete={this.balete}
//           />
//         ))}
//       </div>
//     );
//   }
// }

// function Film(props) {
//   return (
//     <div>
//       {props.title} | {props.director}
//       <button onClick={() => props.balete(props.title)}>BALETED</button>
//     </div>
//   );
// }

// export default App;