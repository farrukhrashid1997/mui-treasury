/* eslint-disable react/sort-comp */
import debounce from 'lodash/debounce';
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Div100vh from 'react-div-100vh';
import CssBaseline from '@material-ui/core/CssBaseline';

// COMPONENTS
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import Box from 'components/atoms/Box';
import Text from 'components/atoms/Text';
import Navigator from 'components/organisms/Navigator';
import Image from 'components/atoms/Image';
import logo from 'assets/images/logo.png';

// PAGES
import HomePage from 'pages/HomePage';
import RootComponentPage from 'pages/RootComponentPage';
import RootBrandPage from 'pages/RootBrandPage';
import RootTemplatePage from 'pages/RootTemplatePage';
import InstructionPage from 'pages/InstructionPage';
import ContributePage from 'pages/ContributePage';
import {
  Header,
  Content,
  Root,
  Nav,
  presets,
} from 'components/predefined/Layout';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { scrollY: 0 };
  }

  componentDidMount() {
    window.addEventListener('scroll', this.debounceScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.debounceScroll);
  }

  handleScroll = () => {
    this.setState({ scrollY: window.scrollY });
  };

  debounceScroll = debounce(this.handleScroll, 100, {
    leading: true,
    trailing: true,
  });

  render() {
    const { scrollY } = this.state;
    return (
      <Root config={presets.createContentBasedLayout()} component={Div100vh}>
        <CssBaseline />
        <Header menuIcon={<Icon>menu_rounded</Icon>}>
          <Box flex={1} />
          <Text align={'center'} flexGrow={1} {...Text.brand}>
            Mui Treasury
          </Text>
          <Box flex={1} flexBasis={'48px'} />
        </Header>
        <Nav
          header={({ isBelowBreakpoint }) =>
            !isBelowBreakpoint && (
              <Box
                {...Box.alignCenter}
                pt={1}
                px={2}
                transition={'0.3s'}
                opacity={0}
                transform={scrollY > 64 ? 'none' : 'translateY(-100px)'}
              >
                <Image opacity={0} width={80} mx={'auto'} src={logo} />
              </Box>
            )
          }
        >
          {({ isBelowBreakpoint, setOpen }) => (
            <>
              {isBelowBreakpoint && (
                <Box py={2}>
                  <IconButton onClick={setOpen}>
                    <Icon>arrow_back_ios_rounded</Icon>
                  </IconButton>
                </Box>
              )}
              <Navigator onClickItem={setOpen} />
            </>
          )}
        </Nav>
        <Content zeroPadding>
          <Switch>
            <Route exact path={'/'} component={HomePage} />
            <Route exact path={'/instruction'} component={InstructionPage} />
            <Route exact path={'/contribution'} component={ContributePage} />
            <Route exact path={'/components/*'} component={RootComponentPage} />
            <Route exact path={'/brands/*'} component={RootBrandPage} />
            <Route exact path={'/templates/*'} component={RootTemplatePage} />
          </Switch>
        </Content>
      </Root>
    );
  }
}

export default App;
