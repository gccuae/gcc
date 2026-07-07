"use client"

import ClientSideLink from '@/app/(admin)/admin/client-side-link';
import React, { useState, useEffect } from 'react'
import {
  HomeIcon,
  NewspaperIcon,
  UserGroupIcon,
  EnvelopeIcon,
  BriefcaseIcon,
  GlobeAltIcon,
} from "@heroicons/react/24/outline";
import { AwardIcon, CommandIcon, GalleryThumbnails, GroupIcon, InfoIcon, LayoutIcon, LeafIcon, PhoneIcon, Settings, Share2Icon, Workflow } from 'lucide-react';
import { useRefetchServices } from '@/app/contexts/refetchServices';
import { RiShakeHandsLine } from 'react-icons/ri';
import { GiHealthNormal } from 'react-icons/gi';
import { FaRobot } from 'react-icons/fa';
import { MdAppRegistration } from 'react-icons/md';

const AdminNavbar = () => {

  const [openLink, setOpenLink] = useState<string | null>(null);
  const { refetchServices } = useRefetchServices();
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    fetchRole()
    fetchServices()
  }, [refetchServices])

  const [services, setServices] = useState([])
  const fetchServices = async () => {
    const response = await fetch("/api/admin/expertise");
    const data = await response.json();
    setServices(data.data.secondSection.items)
  }

  const fetchRole = async () => {
    try {
      const response = await fetch("/api/admin/me");
      if (response.ok) {
        const data = await response.json();
        setRole(data.role);
      }
    } catch (error) {
      console.error("Error fetching role", error);
    }
  }

  const navItems = [
    { name: "Home", href: "/admin/home", icon: HomeIcon },
    { name: "About", href: "/admin/about", icon: InfoIcon },
    { name: "Message", href: "/admin/message", icon: EnvelopeIcon },
    { name: "Group Company", href: "/admin/group-company", icon: GroupIcon },
    { name: "Awards", href: "/admin/awards", icon: AwardIcon },
    {
      name: "Expertise", href: "##", icon: GlobeAltIcon, hasChild: true, children: [
        { name: "Main Page", href: "/admin/expertise" },
        ...services.map((service: { _id: string, title: string }) => (
          { name: service.title, href: `/admin/expertise/${service._id}` }
        )),
      ]
    },
    { name: "Projects", href: "/admin/projects", icon: Workflow },
    { name: "News", href: "/admin/news", icon: NewspaperIcon },
    { name: "Blogs", href: "/admin/blogs", icon: Share2Icon },
    { name: "Gallery", href: "/admin/gallery", icon: GalleryThumbnails },
    { name: "QHSE", href: "/admin/qhse", icon: GiHealthNormal },
    { name: "Sustainability", href: "/admin/sustainability", icon: LeafIcon },
    { name: "AI Technology", href: "/admin/ai-technology", icon: FaRobot },
    {
      name: "Current Openings", href: "####", icon: BriefcaseIcon, hasChild: true, children: [
        { name: "Main Page", href: "/admin/current-openings" },
        { name: "Enquiries", href: "/admin/current-openings/enquiries" },
        { name: "General Enquiries", href: "/admin/current-openings/general-enquiries" },
      ]
    },
    {
      name: "Contact", href: "###", icon: PhoneIcon, hasChild: true, children: [
        { name: "Main Page", href: "/admin/contact" },
        { name: "Enquiries", href: "/admin/contact/enquiries" }
      ]
    },
    { name: "Vendor Registrations", href: "/admin/vendor-registration", icon: MdAppRegistration },
    {
      name: "Layout", href: "#", icon: LayoutIcon, hasChild: true, children: [
        { name: "Navbar", href: "/admin/navbar" },
        { name: "Footer", href: "/admin/footer" },
        { name: "Social Media", href: "/admin/social-media" },
      ]
    },
    {
      name: "Common", href: "#####", icon: CommandIcon, hasChild: true, children: [
        { name: "Icons", href: "/admin/icons" },
      ]
    },
    { name: "Settings", href: "/admin/settings", icon: Settings },
  ];

  // HR sees only these three top-level items
  const HR_ALLOWED_NAMES = ["Current Openings"];

  const visibleNavItems = role === "hr"
    ? navItems.filter((item) => HR_ALLOWED_NAMES.includes(item.name))
    : navItems;

  if (role === null) {
    // Still loading role — render nothing (or a skeleton) to avoid a flash of the full menu
    return null;
  }

  return (
    visibleNavItems.map((item) => {
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