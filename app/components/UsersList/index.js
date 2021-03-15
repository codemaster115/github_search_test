import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { List, makeStyles, Divider, Box } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';

import LoadingIndicator from 'components/LoadingIndicator';
import ListItem from 'components/ListItem';
import UserListItem from 'containers/UserListItem';
import Ul from './Ul';
import Wrapper from './Wrapper';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  list: {
    maxHeight: 600,
    padding: 0,
  },
  paginator: {
    justifyContent: 'center',
    padding: '10px',
  },
}));

function UsersList({ loading, error, users }) {
  const classes = useStyles();
  const usersPerPage = 7;
  const [page, setPage] = React.useState(1);
  const [noOfPages, setNoOfPages] = React.useState(
    Math.ceil((users && users.length) / usersPerPage),
  );

  const handleChange = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    setNoOfPages(Math.ceil((users && users.length) / usersPerPage));
    setPage(1);
  }, [users]);

  if (loading) {
    return <ListItem component={LoadingIndicator} />;
  }

  if (error !== false) {
    return <ListItem item="Something went wrong, please try again!" />;
  }

  if (users !== false) {
    let content = <div />;
    // If we have users, render them
    if (users && users.length > 0) {
      content = (
        <List dense compoent="span" className={classes.list}>
          {users
            .slice((page - 1) * usersPerPage, page * usersPerPage)
            .map(item => (
              <UserListItem user={item} key={item.id} />
            ))}
        </List>
      );
    }

    return (
      <Wrapper>
        <Ul>{content}</Ul>
        <Divider />
        {users && users.length > 0 && (
          <Box component="span">
            <Pagination
              count={noOfPages}
              page={page}
              onChange={handleChange}
              defaultPage={1}
              color="primary"
              size="large"
              showFirstButton
              showLastButton
              classes={{ ul: classes.paginator }}
            />
          </Box>
        )}
      </Wrapper>
    );
  }
  return null;
}

UsersList.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.any,
  users: PropTypes.any,
};

export default UsersList;
