import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { useStore } from 'redux/store';
import useLocale from 'hooks/useLocale';
import useForceSSL from 'hooks/useForceSSL';
import 'styles/variables.css';
import 'styles/bootstrap-grid.css';
import 'styles/index.css';
import '@fontsource/inter/400.css';
import '@fontsource/inter/600.css';

const Intl = ({ children }) => {
  const { locale, messages } = useLocale();

  const Wrapper = ({ children }) => <span className={locale}>{children}</span>;

  return (
    <IntlProvider locale={locale} messages={messages[locale]} textComponent={Wrapper}>
      {children}
    </IntlProvider>
  );
};

export default function App({ Component, pageProps }) {
  useForceSSL(process.env.FORCE_SSL);
  const store = useStore();
  const { basePath } = useRouter();

  return (
    <Provider store={store}>
      <Head>
        <link rel="icon" href={`${basePath}/favicon.svg`} />
        <meta name="theme-color" content="#ffffff" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Intl>
        <Component {...pageProps} />
      </Intl>
    </Provider>
  );
}
