/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-props-no-spreading */

import React from 'react';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { Payment as PaymentIcon } from '@material-ui/icons';
import { formatMessage, MainMenuContribution, withModulesManager } from '@openimis/fe-core';
import {
  RIGHT_PAYMENT,
  RIGHT_BILL_PAYMENT_SEARCH,
} from '../constants';

const PAYMENT_MAIN_MENU_CONTRIBUTION_KEY = "payment.MainMenu";

function PaymentMainMenu(props) {
  const ROUTE_PAYMENTS = 'payments';
  const ROUTE_PAYMENTS_INVOICE = 'payments/invoice';
  
  const entries = [
    {
      text: formatMessage(props.intl, 'payment', 'menu.payments'),
      icon: <PaymentIcon />,
      route: `/${ROUTE_PAYMENTS}`,
      filter: (rights) => rights.includes(RIGHT_PAYMENT),
      id: 'payment.payments',
    },
    {
      text: formatMessage(props.intl, 'payment', 'menu.payments'),
      icon: <PaymentIcon />,
      route: `/${ROUTE_PAYMENTS_INVOICE}`,
      id: 'legalAndFinance.paymentsInvoice',
      filter: (rights) => rights.includes(RIGHT_BILL_PAYMENT_SEARCH),
    },
  ];
  
  entries.push(
    ...props.modulesManager
      .getContribs(PAYMENT_MAIN_MENU_CONTRIBUTION_KEY)
      .filter((c) => !c.filter || c.filter(props.rights)),
  );

  if (!entries.length) return null;

  return (
    <MainMenuContribution
      {...props}
      header={formatMessage(props.intl, 'payment', 'mainMenu')}
      icon={<PaymentIcon />}
      entries={entries}
      menuId="PaymentMainMenu"
    />
  );
}

const mapStateToProps = (state) => ({
  rights: !!state.core && !!state.core.user && !!state.core.user.i_user ? state.core.user.i_user.rights : [],
});

export default injectIntl(withModulesManager(connect(mapStateToProps)(PaymentMainMenu)));
