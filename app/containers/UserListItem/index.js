/**
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import { ListItem, makeStyles } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';

const useStyles = makeStyles(theme => ({
  item: {
    padding: theme.spacing(1.2),
  },
  itemname: {
    padding: theme.spacing(1.2),
    width: '15%',
  },
  itemtxt: {
    padding: theme.spacing(1.2),
    width: '30%',
  },
  avatar: { marginRight: theme.spacing(5) },
}));

function UserListItem(props) {
  const { user } = props;
  const classes = useStyles();
  const [userInfo, setUserInfo] = React.useState({});

  useEffect(() => {
    fetch(user.url)
      .then(res => res.json())
      .then(result => setUserInfo(result));
  }, []);

  // Render the content into a list item
  if (!userInfo) return null;

  return (
    <ListItem
      key={`item-${userInfo.id}`}
      button
      onClick={() => {
        window.location.href = userInfo.html_url;
      }}
    >
      <ListItemText
        id={userInfo.id}
        primary={userInfo.name}
        secondary={userInfo.login}
        className={classes.itemname}
      />
      <ListItemText
        id={userInfo.id}
        secondary={userInfo.bio}
        className={classes.itemtxt}
      />
      <ListItemText
        id={userInfo.id}
        primary={`following:  ${userInfo.following}`}
        secondary={`followers: ${userInfo.followers}`}
        className={classes.item}
      />
      <ListItemAvatar>
        <Avatar
          alt={`Avatar ${user.avatar_url}`}
          src={user.avatar_url}
          className={classes.avatar}
          variant="rounded"
        />
      </ListItemAvatar>
    </ListItem>
  );
}

UserListItem.propTypes = {
  user: PropTypes.any,
};

export default withRouter(UserListItem);
