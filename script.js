// تجربة ربط الـ JavaScript
document.addEventListener('DOMContentLoaded', () => {
    console.log("JavaScript file is loaded successfully!");
    
    // إضافة انيميشين عند التمرير على الفقرة
    const aboutMeSection = document.querySelector('header p');
    
    aboutMeSection.addEventListener('mouseenter', () => {
        aboutMeSection.style.color = "#f39c12"; // تغيير اللون عند التمرير
    });
    
    aboutMeSection.addEventListener('mouseleave', () => {
        aboutMeSection.style.color = "#fff"; // إعادة اللون الطبيعي عند مغادرة الفأرة
    });
    
    // انيميشين للمشاريع
    const projects = document.querySelectorAll('.project');
    projects.forEach((project, index) => {
        project.addEventListener('mouseover', () => {
            project.style.transform = 'scale(1.05)';  // تكبير المشروع عند التمرير
        });
        project.addEventListener('mouseout', () => {
            project.style.transform = 'scale(1)';  // إعادة الحجم الطبيعي عند مغادرة الفأرة
        });
    });
});
