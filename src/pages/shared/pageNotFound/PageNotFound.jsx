
import { Link } from 'react-router-dom';
import notfoundimg from '../../../assets/pageNotFound/1.jpg'


const PageNotFound = () => {
    return (
        <div  className='mx-4 my-10 text-center'>
           
                <h3><span className='text-red-600 font-bold'>Opps! 404</span> Page not found!</h3>
                <p>Go back to <Link className='text-blue-600 font-bold underline' to='/'>Home</Link></p>
                <img className='mx-auto' src={notfoundimg} alt="not found img" />
           
        </div>
    );
};

export default PageNotFound;