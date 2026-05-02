import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import Swal from 'sweetalert2';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

import banner from '../assets/images/home/banner.png';
import bgContact from '../assets/images/home/about.png';
import { MapPin, Phone, Mail } from 'lucide-react';
import HeroSection from '../components/common/HeroSection';

const Contact = () => {
    const form = useRef();

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs.sendForm(
            'service_z8zew2b', // Ganti dengan Service ID Anda
            'template_7lfvgp5', // Ganti dengan Template ID Anda
            form.current,
            '7ZPlAECf_qSGFZKH7' // Ganti dengan Public Key Anda
        )
            .then((result) => {
                Swal.fire({
                    icon: 'success',
                    title: 'Berhasil!',
                    text: 'Pesan Anda telah terkirim.',
                });
                e.target.reset();
            }, (error) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Gagal...',
                    text: 'Terjadi kesalahan, silakan coba lagi.',
                });
            });
    };

    return (
        <div className='bg-slate-50'>
            <Navbar />

            {/* HERO SECTION */}
            <HeroSection title='contact' />


            <section className='container mx-auto px-6 md:px-12 py-28 md:py-32'>
                <div className='flex flex-col md:flex-row gap-10 justify-center'>
                    <div className="flex flex-col items-center p-8 bg-white shadow-md text-center w-64">
                        <Mail
                            size={48}
                            strokeWidth={1.5}
                            className="text-cyan-400 mb-4"
                        />

                        <h3 className="font-bold text-sm tracking-widest mb-4">Email</h3>

                        <p className="text-gray-500 text-sm leading-relaxed">
                            cutting@gmail.com
                        </p>
                    </div>

                    <div className="flex flex-col items-center p-8 bg-white shadow-md text-center w-64">
                        <Phone
                            size={48}
                            strokeWidth={1.5}
                            className="text-cyan-400 mb-4"
                        />

                        <h3 className="font-bold text-sm tracking-widest mb-4">Phone Number</h3>

                        <p className="text-gray-500 text-sm leading-relaxed">
                            012345678910
                        </p>
                    </div>

                    <div className="flex flex-col items-center p-8 bg-white shadow-md text-center w-64">
                        {/* size: mengatur ukuran ikon (dalam pixel)
         strokeWidth: mengatur ketebalan garis ikon
      */}
                        <MapPin
                            size={48}
                            strokeWidth={1.5}
                            className="text-cyan-400 mb-4"
                        />

                        <h3 className="font-bold text-sm tracking-widest mb-4">OUR MAIN OFFICE</h3>

                        <p className="text-gray-500 text-sm leading-relaxed">
                            SoHo 94 Broadway St New York, NY 1001
                        </p>
                    </div>

                </div>
            </section>

            <section
                className="relative min-h-screen flex justify-center pt-20 bg-cover bg-center"
                style={{ backgroundImage: `url(${bgContact})` }}
            >
                {/* Menggunakan biru gelap bawaan Tailwind dengan opasitas 85% */}
                <div className="absolute inset-0 bg-blue-900 opacity-85"></div>

                <div className="container mx-auto px-6 md:px-12 relative z-10 w-full text-center text-white">
                    <h1 className="text-3xl font-bold mb-2 text-white">CONTACT FORM</h1>
                    <p className="text-blue-100 mb-8">Feel free to contact us with fill this form</p>

                    <form ref={form} onSubmit={sendEmail} className='flex flex-col gap-4'>
                        <div className='flex text-start gap-6'>
                            <div className='flex flex-col gap-1 w-full'>
                                <label>Nama Lengkap</label>
                                {/* name="name" cocok dengan {{name}} di template */}
                                <input name="name" required type="text" placeholder='Nama Lengkap' className='w-full bg-white text-slate-500 rounded-md p-2' />
                            </div>
                            <div className='flex flex-col gap-1 w-full'>
                                <label>Email</label>
                                {/* name="email" cocok dengan {{email}} di template */}
                                <input name="email" required type="email" placeholder='Email Anda' className='w-full bg-white text-slate-500 rounded-md p-2' />
                            </div>
                        </div>

                        <div className='flex text-start gap-6'>
                            <div className='flex flex-col gap-1 w-full'>
                                <label>Phone</label>
                                {/* name="phone" cocok dengan {{phone}} di template */}
                                <input name="phone" required type="number" placeholder='Nomor HP' className='w-full bg-white text-slate-500 rounded-md p-2' />
                            </div>
                            <div className='flex flex-col gap-1 w-full'>
                                <label>Subject</label>
                                {/* name="subject" cocok dengan {{subject}} di template */}
                                <input name="subject" required type="text" placeholder='Subjek Pesan' className='w-full bg-white text-slate-500 rounded-md p-2' />
                            </div>
                        </div>

                        <div className='flex flex-col gap-1 w-full text-start'>
                            <label>Message</label>
                            {/* name="message" cocok dengan {{message}} di template */}
                            <textarea name="message" required rows={6} placeholder='Isi Pesan' className='w-full bg-white text-slate-500 rounded-md p-2'></textarea>
                        </div>

                        <div className='flex justify-end pt-10'>
                            <button type="submit" className='py-2 px-8 rounded-lg bg-blue-500 hover:bg-blue-600 text-white cursor-pointer duration-500'>
                                Send Message
                            </button>
                        </div>
                    </form>
                </div>
            </section>
            
            <Footer />
        </div>
    )
}

export default Contact