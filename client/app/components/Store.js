import React, { useEffect, useState } from 'react';

import { getCategories } from '../store/slices/category';
import { useDispatch, useSelector } from 'react-redux';

import { Spinner } from 'reactstrap';

import Image from '../assets/img/template.jpg';

const template_list = [
    { name: 'Apparels Shopping Site', description: 'This is a Ecommerce Platform for Apparels shopping', price: 99.99},
    { name: 'Ecommerce Platform', description: 'This is a Ecommerce Platform2 with MERN Stack', price: 149.99},
    { name: 'Ecommerce Platform', description: 'This is a Ecommerce Platform2 with MERN Stack', price: 149.99},
    { name: 'Ecommerce Platform', description: 'This is a Ecommerce Platform2 with MERN Stack', price: 149.99},
    { name: 'Ecommerce Platform', description: 'This is a Ecommerce Platform2 with MERN Stack', price: 149.99},
    { name: 'Ecommerce Platform', description: 'This is a Ecommerce Platform2 with MERN Stack', price: 149.99},
    { name: 'Ecommerce Platform', description: 'This is a Ecommerce Platform2 with MERN Stack', price: 149.99},
    { name: 'Ecommerce Platform', description: 'This is a Ecommerce Platform2 with MERN Stack', price: 149.99},
    { name: 'Ecommerce Platform', description: 'This is a Ecommerce Platform2 with MERN Stack', price: 149.99},
    { name: 'Ecommerce Platform', description: 'This is a Ecommerce Platform2 with MERN Stack', price: 149.99},
    { name: 'Ecommerce Platform', description: 'This is a Ecommerce Platform2 with MERN Stack', price: 149.99},
];
const Store = () => {
    const [ focusCategory, setFocusCategory ] = useState(0);
    const { isLoading, categories } = useSelector(state => state.category);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCategories({}));
    }, [])

    return (
        <section id='store' className='section bg-primary py-12'>
            <div className='container mx-auto'>
                {
                    isLoading ? <Spinner style={{ margin:'1rem', color:"#ffffff", width: '6rem', height: '6rem' }} /> :
                    <div className='flex'>
                        <div className='min-w-[25%] px-2 mr-10'>
                            <p className='relative text-lg mb-3'>
                                All Categories
                                <span className='absolute right-0 top-0'>1</span>
                            </p>
                            {
                                categories && categories.map((category, index) => {
                                    return (
                                        <p key={'category_'+index} className='relative ml-2 mb-1 cursor-pointer hover:text-white'>
                                            {category.name}
                                            <span className='absolute right-0 top-0'>{category.products.length}</span>
                                        </p>
                                    )
                                })
                            }
                        </div>
                        <div className='text-white w-auto max-h-[calc(80vh)] flex flex-wrap gap-5 overflow-y-auto no-scrollbar'>
                            {
                                template_list.map((template, index) => {
                                    return (
                                        <div key={'template_'+index} className='bg-secondary p-2 min-w-[100%] cursor-pointer'>
                                            <img src={Image} alt='template'/>
                                            <div className='flex justify-between mt-1'>
                                                <p>{template.name}</p>
                                                <p>${template.price}</p>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                }
            </div>
        </section>
    )
}

export default Store;