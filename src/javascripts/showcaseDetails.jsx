import React, { Component, PropTypes } from 'react';
import 'stylesheets/modules/showcase';
import 'stylesheets/utilities/clearfix';

const ShowcaseDetails = (props) => {
  const { showcaseItem } = props;
  const slideshow = showcaseItem.slideshow;
  const landscape = (((showcaseItem.type === 'Animation') || (showcaseItem.type === 'Video')) && (slideshow[0].indexOf('gif') === -1));
  const { name, year, materials, team, description, client, clients, press } = showcaseItem;
  const allProperties = [];
  allProperties.push(['name', name], ['year', year], ['materials', materials], ['team', team], ['client', client], ['description', description], ['clients', clients]);
  const allDetails = allProperties.filter(item => item[1]);
  return (
    <div className={(landscape) ? 'item-details landscape' : 'item-details'}>
      {allDetails.map((detail, index) => {
        return <div className={detail[0]} key={index}>{(detail[0] === 'client') ? <span><strong>Client: </strong>{detail[1]}</span> : (detail[0] === 'clients') ? <span><strong>Select Clients: </strong>{detail[1]}</span> : detail[1]}</div>;
      })}
      {press && <div className={'press'}><strong>Press: </strong>{showcaseItem.press.map((item, index, collection) => {
        if (index < (collection.length - 1)) {
          return <span key={index}><a href={item[1]}>{item[0]}</a>, </span>;
        }
        return <span key={index}><a href={item[1]}>{item[0]}</a></span>;
      })}
      </div>}
    </div>
  );
};

ShowcaseDetails.propTypes = {
  showcaseItem: React.PropTypes.object.isRequired,
};

export default ShowcaseDetails;
