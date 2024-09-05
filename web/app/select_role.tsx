import React from 'react';
import logo from "@/assets/logo.svg"
import student from "@/assets/student.svg"
import faculty from "@/assets/faculty.svg"
import {Button} from "@/components/ui/button.tsx";

const SelectRole: React.FC = () => {
    return (
        <div className={'min-h-dvh flex flex-col justify-center items-center'}>
            <img src={logo} className={'w-32 h-32'} alt="certifai_logo"/>
            <div className={'font-semibold text-md md:text-lg'}>Just one more step before you begin!
                Please select your role:
            </div>
            <div className={'text-muted-foreground mt-3 text-sm md:text-md'}>Please select whether you are a Student or Faculty:
            </div>
            <div className={'flex flex-col md:flex-row gap-x-5 gap-y-5 md:gap-y-0 overflow-hidden mt-5'}>
                <Button variant={'outline'} className={'w-auto h-auto flex flex-col p-12 px-24 gap-y-5'}>
                    <img src={student} alt="" className={'w-36'}/>
                    <div className={'text-xl font-medium'}>Student</div>
                </Button>
                <Button variant={'outline'} className={'w-auto h-auto flex flex-col p-12 px-24 gap-y-5'}>
                    <img src={faculty} alt="" className={'w-36'}/>
                    <div className={'text-xl font-medium'}>Faculty</div>
                </Button>
            </div>
            <Button className={'mt-5 px-24'}>Continue</Button>
            <div className={'flex flex-row justify-between gap-x-1 mt-5'}>
                <p className={'text-sm text-muted-foreground flex'}>Need help deciding?</p>
                <Button variant={'link'} className={'p-0 font-medium flex items-start'}>Contact Support</Button>
            </div>
        </div>
    );
};

export default SelectRole;