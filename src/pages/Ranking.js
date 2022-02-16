import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import md5 from 'crypto-js/md5';

class Ranking extends React.Component {
  sortRanking = (a, b) => (b.score - a.score);

  render() {
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    ranking.sort(this.sortRanking);
    return (
      <main>
        <h1 data-testid="ranking-title">Titulo</h1>
        {ranking.map((elem, index) => (
          <div key={ index }>
            <p data-testid={ `player-name-${index}` }>{elem.name}</p>
            <img alt="profile" src={ `https://www.gravatar.com/avatar/${md5(elem.picture).toString()}` } data-testid="header-profile-picture" />
            <p data-testid={ `player-score-${index}` }>
              {elem.score}
            </p>
          </div>
        ))}
        <Link to="/">
          <button type="button" data-testid="btn-go-home">Inicio</button>
        </Link>
      </main>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.player.name,
  score: state.player.score,
  email: state.player.gravatarEmail,
});

export default connect(mapStateToProps, null)(Ranking);
