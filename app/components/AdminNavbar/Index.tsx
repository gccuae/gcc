"use client"

import ClientSideLink from '@/app/(admin)/admin/client-side-link';
import React, { useState } from 'react'
import {
    HomeIcon,
    NewspaperIcon,
    UserGroupIcon,
    EnvelopeIcon,
    BriefcaseIcon,
    GlobeAltIcon,
  } from "@heroicons/react/24/outline";
import { AwardIcon, GalleryThumbnails, HeartHandshake, LeafIcon, Settings, ThumbsUp, Workflow } from 'lucide-react';
import { useEffect } from 'react';



const AdminNavbar = () => {

    const [openLink, setOpenLink] = useState<string | null>(null);
    
    useEffect(() => {
      fetchServices()
  },[])
  
  const [services, setServices] = useState([])
  const fetchServices = async () => {
      const response = await fetch("/api/admin/expertise");
      const data = await response.json();
      setServices(data.data.secondSection.items)
  }

    const navItems = [
        { name: "Home", href: "/admin/home", icon: HomeIcon },
        { name: "About", href: "/admin/about", icon: UserGroupIcon },
        { name: "Message", href: "/admin/message", icon: EnvelopeIcon },
        { name: "Our Team", href: "/admin/team", icon: UserGroupIcon },
        { name: "Group Company", href: "/admin/group-company", icon: UserGroupIcon },
        { name: "Awards", href: "/admin/awards", icon: AwardIcon },
        // { name: "Clients", href: "/admin/clients", icon: PresentationChartBarIcon },
        // { name: "Services", href: "#", icon: EnvelopeIcon,hasChild:true,children: [
        //     { name: "Engineering", href: "/admin/services/engineering" },
        //     { name: "Fabrication", href: "/admin/services/fabrication" },
        //     { name: "Blasting", href: "/admin/services/blasting" },
        //     { name: "Steel Erection", href: "/admin/services/steel-erection" },
        //   ] },
        // { name: "Industries", href: "/admin/industries", icon: BriefcaseIcon },
        { name: "Expertise", href: "##", icon: GlobeAltIcon , hasChild:true,children: [
          { name: "Main Page", href: "/admin/expertise" },
          ...services.map((service: { _id: string,title:string }) => (
            { name: service.title, href: `/admin/expertise/${service._id}` }
          )),
        ] },
        { name: "Projects", href: "/admin/projects", icon: Workflow },
        { name: "Clients", href: "/admin/clients", icon: NewspaperIcon },
        { name: "News", href: "/admin/news", icon: NewspaperIcon },
        { name: "Blogs", href: "/admin/blogs", icon: NewspaperIcon },
        { name: "Gallery", href: "/admin/gallery", icon: GalleryThumbnails },
        { name: "Team", href: "/admin/team", icon:UserGroupIcon },
        { name: "Careers", href: "####", icon:BriefcaseIcon,hasChild:true,children: [
          { name: "Main Page", href: "/admin/careers" },
          {name:"Enquiries",href:"/admin/careers/enquiries"}
        ] },
        { name: "Contact", href: "###", icon: EnvelopeIcon,hasChild:true,children: [
          { name: "Main Page", href: "/admin/contact" },
          {name:"Enquiries",href:"/admin/contact/enquiries"}
        ] },
        { name: "Quality", href: "/admin/quality", icon: ThumbsUp },
        { name: "HSE", href: "/admin/hse", icon: HeartHandshake },
        { name: "Sustainability", href: "/admin/sustainability", icon: LeafIcon },
        { name: "Settings", href: "/admin/settings", icon: Settings},
      ];

  return (
    navItems.map((item) => {
        const Icon = item.icon;
        return (
          <ClientSideLink
            key={item.href}
            href={item.href}
            name={item.name}
            icon={<Icon className="h-5 w-5" />}
            isOpen={openLink === item.href}
            setOpenLink={setOpenLink}
            hasChild={item.hasChild}
          >
            {item.children}
          </ClientSideLink>
        );
      })
  )
}

export default AdminNavbar