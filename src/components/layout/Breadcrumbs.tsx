import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { supabase } from "@/integrations/supabase/client";

interface BreadcrumbData {
  courseName?: string;
  moduleName?: string;
  lessonName?: string;
}

export const Breadcrumbs = () => {
  const location = useLocation();
  const pathSegments = location.pathname.split("/").filter(Boolean);
  const [names, setNames] = useState<BreadcrumbData>({});

  useEffect(() => {
    const fetchNames = async () => {
      const data: BreadcrumbData = {};
      
      // Find course ID and fetch course name
      const courseIndex = pathSegments.indexOf("course");
      if (courseIndex !== -1 && pathSegments[courseIndex + 1]) {
        const { data: course } = await supabase
          .from("course")
          .select("name")
          .eq("id", parseInt(pathSegments[courseIndex + 1]))
          .maybeSingle();
        if (course) data.courseName = course.name;
      }

      // Find module ID and fetch module name
      const moduleIndex = pathSegments.indexOf("module");
      if (moduleIndex !== -1 && pathSegments[moduleIndex + 1]) {
        const { data: module } = await supabase
          .from("module")
          .select("name")
          .eq("id", parseInt(pathSegments[moduleIndex + 1]))
          .maybeSingle();
        if (module) data.moduleName = module.name;
      }

      // Find lesson ID and fetch lesson name
      const lessonIndex = pathSegments.indexOf("lesson");
      if (lessonIndex !== -1 && pathSegments[lessonIndex + 1]) {
        const { data: lesson } = await supabase
          .from("lesson")
          .select("name")
          .eq("id", parseInt(pathSegments[lessonIndex + 1]))
          .maybeSingle();
        if (lesson) data.lessonName = lesson.name;
      }

      setNames(data);
    };

    fetchNames();
  }, [location.pathname]);

  // Build breadcrumb items based on current path
  const items = pathSegments.reduce<Array<{ href: string; label: string }>>((acc, segment, index) => {
    const path = `/${pathSegments.slice(0, index + 1).join("/")}`;
    let label = segment;
    
    // Handle course names
    if (segment === "course") return acc;
    if (pathSegments[index - 1] === "course") {
      if (names.courseName) label = names.courseName;
    }
    
    // Handle module names
    if (segment === "module") return acc;
    if (pathSegments[index - 1] === "module") {
      if (names.moduleName) label = names.moduleName;
    }
    
    // Handle lesson names
    if (segment === "lesson") return acc;
    if (pathSegments[index - 1] === "lesson") {
      if (names.lessonName) label = names.lessonName;
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