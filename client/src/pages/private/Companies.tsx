import Header from '../../components/header/PrivateHeader';
import SignCompanyTable from '../../components/signCompanyTable/SignCompanyTable';
import Footer from '../../components/footer/Footer';
import usePageTitle from '../../hooks/UsePageTitle';

const Pets: React.FC = () => {
  return (
    <>
      {usePageTitle("Empresas| Genious")}
        <Header/>
        <main className=''><SignCompanyTable /></main>
        <Footer/>
    </>
  );
};

export default Pets;