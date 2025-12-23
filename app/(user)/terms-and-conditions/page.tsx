import Index from '@/app/components/Terms-and-conditions';
import { TermsConditionsType } from '../../components/Terms-and-conditions/type'; // Adjust the path as necessary
import { termsConditionsData } from '../../../public/data/terms-conditions-data';

export default function TermsAndConditionsPage() {
    const data: TermsConditionsType = termsConditionsData;
    return <Index data={data} />;
}