'use client';

import { TbBeach, TbMountain, TbPool } from "react-icons/tb";
import Container from "../Container";
import { GiBoatFishing, GiCactus, GiCastle, GiCaveEntrance, GiForestCamp, GiIsland, GiWindmill } from "react-icons/gi";
import { MdOutlineVilla } from "react-icons/md";
import CategoryBox from "../CategoryBox";
import { usePathname, useSearchParams } from "next/navigation";
import { FaSkiing } from "react-icons/fa";
import { BsSnow } from "react-icons/bs";
import { IoDiamond } from "react-icons/io5";

export const categories = [
    {
        label: 'Beach',
        icon: TbBeach,
        description: 'Bu tesis plaja yakın'
    },
    {
        label: 'Windmills',
        icon: GiWindmill,
        description: 'Bu tesiste yel değirmeni var'
    },
    {
        label: 'Modern',
        icon: MdOutlineVilla,
        description: 'Bu tesis Modern'
    },
    {
        label: 'Countryside',
        icon: TbMountain,
        description: 'Bu tesis Kırsal bir kesimde yer almaktadır'
    },
    {
        label: 'Pools',
        icon: TbPool,
        description: 'Bu tesiste havuz bulunmaktadır.'
    },
    {
        label: 'Islands',
        icon: GiIsland,
        description: 'Bu tesis adada bulunmaktadır'
    },
    {
        label: 'Lake',
        icon: GiBoatFishing,
        description: 'Bu tesis Göle yakın bir konumda bulunmaktadır'
    },
    {
        label: 'Skiing',
        icon: FaSkiing,
        description: 'Bu tesiste kayak aktiviteleri bulunmaktadır.'
    },
    {
        label: 'Castles',
        icon: GiCastle,
        description: 'Bu tesis bir kalenin içerisinde bulunmaktadır.'
    },
    {
        label: 'Camping',
        icon: GiForestCamp,
        description: 'Bu tesiste kamp aktiviteleri bulunmaktadır.'
    },
    {
        label: 'Arctic',
        icon: BsSnow,
        description: 'Bu tesiste kamp aktiviteleri bulunmaktadır.'
    },
    {
        label: 'Cave',
        icon: GiCaveEntrance,
        description: 'Bu tesis bir mağara içerisinde bulunmaktadır.'
    },
    {
        label: 'Desert',
        icon: GiCactus,
        description: 'Bu tesis çölde bulunmaktadır'
    },
    {
        label: 'Barns',
        icon: GiCaveEntrance,
        description: 'Bu tesis bir ahır içerisinde bulunmaktadır.'
    },
    {
        label: 'Lux',
        icon: IoDiamond,
        description: 'Bu lüks bir tesisdir'
    },
]


const Categories = () => {
    const params = useSearchParams();
    const category = params?.get('category');
    const pathname = usePathname();

    const isMainPage = pathname === '/';

    if(!isMainPage){
        return null;
    }
    return (
        <Container>
            <div
            className="
            pt-4
            flex
            flex-row
            items-center
            justify-between
            overflow-x-auto

            "
            >
            {categories.map((item) => (
                <CategoryBox
                key = {item.label}
                label = {item.label}
                selected={category === item.label}
                icon = {item.icon}
                />
            ))}
            </div>


        </Container>
    );
} 

export default Categories;