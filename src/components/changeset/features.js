// @flow
import React from 'react';
import { Map, fromJS } from 'immutable';
import { Reasons } from '../reasons';

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

const Feature = ({ data }) => (
  <tr className="txt-s">
    <td>{data.get('osm_id')}</td>
    <td>{data.get('name')}</td>
    <td><Reasons reasons={data.get('reasons')} /></td>
    <td>
      <span className="cursor-pointer txt-bold txt-underline-on-hover mr6">
        Map
      </span>
      <span className="cursor-pointer txt-bold txt-underline-on-hover">
        JOSM
      </span>
    </td>
  </tr>
);

export function Features({
  properties,
  changesetId
}: {
  properties: Map<string, *>,
  changesetId: number
}) {
  // features[0].reasons
  const features = fromJS(
    shuffle([
      {
        osm_id: 2593918603,
        url: 'node-2593918603',
        name: 'HDFC Bank ATM',
        reasons: ['Deleted a wikidata/wikipedia tag']
      },
      {
        osm_id: 2412772337,
        url: 'node-2412772337',
        name: 'HDFC ATM',
        reasons: ['Deleted a wikidata/wikipedia tag']
      },
      {
        osm_id: 2593876995,
        url: 'node-2593876995',
        name: 'Andhra Bank ATM',
        reasons: ['Deleted a wikidata/wikipedia tag']
      },
      {
        osm_id: 2412772336,
        url: 'node-2412772336',
        name: 'ICICI ATM',
        reasons: ['Deleted a wikidata/wikipedia tag']
      },
      {
        osm_id: 4557677889,
        url: 'node-4557677889',
        name: 'Hitch city',
        reasons: ['edited a name tag']
      },
      {
        osm_id: 3593876995,
        url: 'node-2593876995',
        name: 'Guj Bank ATM',
        reasons: ['Deleted a wikidata/wikipedia tag']
      },
      {
        osm_id: 2412772336,
        url: 'node-2412772336',
        name: 'ATM',
        reasons: ['Is too cool 😎']
      }
    ]).slice(0, parseInt(Math.random() * 100, 10) % 7)
  );
  return (
    <div className="p18">
      <div>
        <h2 className="txt-l mr6 txt-bold">
          Suspicious Features ({features.size})
        </h2>
        {features.size === 0
          ? `No suspicious features for ${changesetId}.`
          : <table className="table cmap-custom-table mt12">
              <thead>
                <tr className="txt-s txt-uppercase">
                  <th>OSM Id</th>
                  <th>Name</th>
                  <th>Reasons</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {features.map((f, k) => <Feature key={k} data={f} />)}
              </tbody>
            </table>}
      </div>
    </div>
  );
}