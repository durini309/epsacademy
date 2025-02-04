
import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { courses } from "@/lib/modules";

export const Breadcrumbs = () => {
  const location = useLocation();
  const pathSegments = location.pathname.split("/").filter(Boolean);
  
  // Build breadcrumb items based on current path
  const items = pathSegments.reduce<Array<{ href: string; label: string }>>((acc, segment, index) => {
    const path = `/${pathSegments.slice(0, index + 1).join("/")}`;
    let label = segment;
    
    // Handle course names
    if (segment === "course") return acc;
    if (index === 1) { // This is a course ID
      const course = courses.find(c => c.id === segment);
      if (course) label = course.title;
    }
    
    // Handle module names
    if (segment === "module") return acc;
    if (pathSegments[index - 1] === "module") {
      const courseId = pathSegments[1];
      const course = courses.find(c => c.id === courseId);
      const moduleId = parseInt(segment);
      const module = course?.modules.find(m => m.id === moduleId);
      if (module) label = module.title;
    }
    
    // Handle section names
    if (segment === "section") return acc;
    if (pathSegments[index - 1] === "section") {
      const courseId = pathSegments[1];
      const course = courses.find(c => c.id === courseId);
      const moduleId = parseInt(pathSegments[3]);
      const module = course?.modules.find(m => m.id === moduleId);
      const section = module?.sections.find(s => s.id === segment);
      if (section) label = section.title;
    }
    
    acc.push({ href: path, label });
    return acc;
  }, [{ href: "/", label: "Home" }]);

  return (
    <Breadcrumb className="max-w-4xl mx-auto px-4 py-2">
      <BreadcrumbList>
        {items.map((item, index) => (
          <React.Fragment key={item.href}>
            <BreadcrumbItem>
              {index === items.length - 1 ? (
                <BreadcrumbPage>{item.label}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink asChild>
                  <Link to={item.href}>{item.label}</Link>
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
            {index < items.length - 1 && <BreadcrumbSeparator />}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};
