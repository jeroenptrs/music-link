import * as pj from '../../../package.json';

export default async function fetchAPI(type, obj) {
  let state = {};

  try {
    let r = await fetch(pj.genericApi + 'genericApi', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        artist: obj.props.match.params.artist,
        album: obj.props.match.params.album,
        type: type,
      }),
    });

    r = await r.json();
    state[type] = r[type];
    obj.setState(state);
  } catch (error) { console.log(error); }
}
