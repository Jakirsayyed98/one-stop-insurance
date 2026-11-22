import { SiteContext, type SiteContextValue } from './lib/context';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { VehicleInsurance } from './pages/VehicleInsurance';
import { Services } from './pages/Services';
import { InsuranceTypes } from './pages/InsuranceTypes';
import { Renewal } from './pages/Renewal';
import { Faqs } from './pages/Faqs';
import { Contact } from './pages/Contact';
import { Legal } from './pages/Legal';
import type { RouteId } from './routes';

function Page({ route }: { route: RouteId }) {
  switch (route) {
    case 'home': return <Home />;
    case 'about': return <About />;
    case 'vehicle': return <VehicleInsurance />;
    case 'services': return <Services />;
    case 'types': return <InsuranceTypes />;
    case 'renewal': return <Renewal />;
    case 'faqs': return <Faqs />;
    case 'contact': return <Contact />;
    case 'terms': return <Legal kind="terms" />;
    case 'disclaimer': return <Legal kind="disclaimer" />;
  }
}

export function App(props: SiteContextValue) {
  return (
    <SiteContext.Provider value={props}>
      <Layout>
        <Page route={props.route} />
      </Layout>
    </SiteContext.Provider>
  );
}
