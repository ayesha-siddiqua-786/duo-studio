function loco(){
    gsap.registerPlugin(ScrollTrigger);

    // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll
    
    const locoScroll = new LocomotiveScroll({
      el: document.querySelector(".main"),
      smooth: true
    });
    // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
    locoScroll.on("scroll", ScrollTrigger.update);
    
    // tell ScrollTrigger to use these proxy methods for the ".main" element since Locomotive Scroll is hijacking things
    ScrollTrigger.scrollerProxy(".main", {
      scrollTop(value) {
        return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
      }, // we don't have to define a scrollLeft because we're only scrolling vertically.
      getBoundingClientRect() {
        return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
      },
      // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
      pinType: document.querySelector(".main").style.transform ? "transform" : "fixed"
    });
    
   
    // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
    
    // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
    ScrollTrigger.refresh();
    
}
loco()
var crsr = document.querySelector(".cursor")
var main = document.querySelector(".main")
main.addEventListener("mousemove",function(dets){
    crsr.style.left= dets.x+5+"px"
    crsr.style.top=dets.y+5+"px"
})
var tl = gsap.timeline({
    scrollTrigger:{
        scroller:".main",
        trigger:".page1 h1",
        start:"top 27%",
        end:"top 0",
        scrub:3
    }
})
tl.to(".page1 h1",{
    x: -100,
},"anim")
tl.to(".page1 h2",{
    x:100
},"anim")
tl.to(".page1 video",{
    width:"90%"
},"anim")

gsap.to(".page2",{
    backgroundColor:"#fff",
    color:"#111",
    scrollTrigger:{
        scroller:".main",
        trigger:".page2",
        start:"top 5%",
    }
})

gsap.to(".page4",{
    backgroundColor:"#111",
    color:"#fff",
    scrollTrigger:{
        scroller:".main",
        trigger:".page4",
        start:"top 5%",
    }
})

var boxes = document.querySelectorAll(".page5-inner")
boxes.forEach(function(elem){
    elem.addEventListener("mouseenter",function(){
        var att = elem.getAttribute("data-image")
        crsr.style.width = "40vw"
        crsr.style.height = "40vw"
        crsr.style.borderRadius = "0"
        crsr.style.backgroundImage = `url(${att})`
    })
    elem.addEventListener("mouseleave",function(){
        elem.style.backgroundColor = "transparent"
        crsr.style.width = "1.5vw"
        crsr.style.height = "1.5vw"
        crsr.style.borderRadius = "50%"
        crsr.style.backgroundImage = `none`
    })
})

gsap.to(".page2",{
    backgroundColor:"#fff",
    color:"#111",
    scrollTrigger:{
        scroller:".main",
        trigger:"#nav",
        start:"top top",
        end:"bottom top",
        scrub:2
    }
})