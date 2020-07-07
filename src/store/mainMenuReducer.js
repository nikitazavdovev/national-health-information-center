import {CLOSE_MAIN_MENU, OPEN_MAIN_MENU, TOGGLE_MAIN_MENU} from "./types";

const initialState = {
  isMainMenuOpen: false,
  menuItems: [
    {
      title: 'Dashboard',
      icon: 'menu',
      link: '/dashboard'
    },
    {
      title: 'Code Managements',
      icon: 'settings',
      link: '/code-managements'
    },
    {
      title: 'Pending Request',
      icon: 'notification',
      link: '/pending-requests'
    },
    {
      title: 'Reports',
      icon: 'bars',
      link: '/reports'
    },
    {
      title: 'User Management',
      icon: 'user',
      link: '/user-management'
    },
    {
      title: 'Search',
      icon: 'search',
      link: '/search'
    }
  ]
};

export const mainMenuReducer = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_MAIN_MENU:
      return {...state, isMainMenuOpen: true};
    case CLOSE_MAIN_MENU:
      return {...state, isMainMenuOpen: false};
    case TOGGLE_MAIN_MENU:
      return {...state, isMainMenuOpen: !state.isMainMenuOpen};
    default: return state;
  }
};