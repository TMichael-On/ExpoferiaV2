$(window).on("load", function() {
    "use strict";

    

    //  ============= POST PROJECT POPUP FUNCTION =========

    $(".post_project").on("click", function(){
        $(".post-popup.pst-pj").addClass("active");
        $(".wrapper").addClass("overlay");
        return false;
    });
    $(".post-project > a").on("click", function(){
        $(".post-popup.pst-pj").removeClass("active");
        $(".wrapper").removeClass("overlay");
        return false;
    });

    //  ============= POST JOB POPUP FUNCTION =========

    $(".post-jb").on("click", function(){
        $(".post-popup.job_post").addClass("active");
        $(".wrapper").addClass("overlay");
        return false;
    });
    $(".post-project > a").on("click", function(){
        $(".post-popup.job_post").removeClass("active");
        $(".wrapper").removeClass("overlay");
        return false;
    });

    //  ============= SIGNIN CONTROL FUNCTION =========

    $('.sign-control li').on("click", function(){
        var tab_id = $(this).attr('data-tab');
        $('.sign-control li').removeClass('current');
        $('.sign_in_sec').removeClass('current');
        $(this).addClass('current animated fadeIn');
        $("#"+tab_id).addClass('current animated fadeIn');
        return false;
    });

    //  ============= SIGNIN TAB FUNCTIONALITY =========

    $('.signup-tab ul li').on("click", function(){
        var tab_id = $(this).attr('data-tab');
        $('.signup-tab ul li').removeClass('current');
        $('.dff-tab').removeClass('current');
        $(this).addClass('current animated fadeIn');
        $("#"+tab_id).addClass('current animated fadeIn');
        return false;
    });

    //  ============= SIGNIN SWITCH TAB FUNCTIONALITY =========

    $('.tab-feed ul li').on("click", function(){
        var tab_id = $(this).attr('data-tab');
        $('.tab-feed ul li').removeClass('active');
        $('.product-feed-tab').removeClass('current');
        $(this).addClass('active animated fadeIn');
        $("#"+tab_id).addClass('current animated fadeIn');
        return false;
    });

    //  ============= COVER GAP FUNCTION =========

    var gap = $(".container").offset().left;
    $(".cover-sec > a, .chatbox-list").css({
        "right": gap
    });

    //  ============= EMPRESA EDIT FUNCTION =========

    $(".btn-empresa-edit-open").on("click", function(){
        var modal = document.querySelector('#modal-empresa-datos');
        //Elementos de la vista
        const h3_nombre = document.getElementById('empresa_nombre');
        const h3_ruc = document.getElementById('empresa_RUC');
        const h3_actividad = document.getElementById('empresa_actividad');
        const h3_tamano = document.getElementById('empresa_tamano');
        const h3_ubicacion = document.getElementById('empresa_ubicacion');
        const h3_telefono = document.getElementById('empresa_telefono');
        const h3_correo = document.getElementById('empresa_correo');
        // Elementos del modal
        const u_nombre = document.getElementById('u-empresa-nombre');
        const u_ruc = document.getElementById('u-empresa-ruc');
        const u_actividad = document.getElementById('u-empresa-actividad');
        const u_tamano = document.getElementById('u-empresa-tamano');
        const u_ubicacion = document.getElementById('u-empresa-ubicacion');
        const u_telefono = document.getElementById('u-empresa-telefono');
        const u_correo = document.getElementById('u-empresa-correo');

        u_nombre.value = h3_nombre.textContent;
        u_ruc.value = h3_ruc.textContent;
        u_actividad.value = h3_actividad.textContent;
        u_tamano.value = h3_tamano.textContent;
        u_ubicacion.value = h3_ubicacion.textContent;
        u_telefono.value = h3_telefono.textContent;
        u_correo.value = h3_correo.textContent;

        $(modal).modal('show');        
        return false;
    });

    //  ============= ENLACE EDIT FUNCTION =========

    $(".empresa-enlace-open").on("click", function(){
        var modal = document.querySelector('#modal-enlace');
        $(modal).modal('show');        
        return false;
    });
    
    //  ============= OVERVIEW EDIT FUNCTION =========

    $(".sobre-nosotros-open").on("click", function(){
        // $("#overview-box").addClass("open");
        // $(".wrapper").addClass("overlay");
        var modal = document.querySelector('#modal-sobre-nosotros');

        // const usuario_descripcion = document.getElementById('usuario_descripcion');
        // const editar_descripcion = document.getElementById('editar_descripcion');
        // editar_descripcion.innerText = usuario_descripcion.innerText;
        $(modal).modal('show');
        return false;
    });
    // $(".close-box").on("click", function(){
    //     $("#overview-box").removeClass("open");
    //     $(".wrapper").removeClass("overlay");
    //     return false;
    // });
    
    //  ============= HISTORIA EDIT FUNCTION =========

    $(".empresa-historia-open").on("click", function(){
        var modal = document.querySelector('#modal-historia');
        $(modal).modal('show');        
        return false;
    });

    //  ============= VISIÓN EDIT FUNCTION =========

    $(".empresa-vision-open").on("click", function(){
        var modal = document.querySelector('#modal-vision');
        $(modal).modal('show');        
        return false;
    });

    //  ============= MISIÓN EDIT FUNCTION =========

    $(".empresa-mision-open").on("click", function(){
        var modal = document.querySelector('#modal-mision');
        $(modal).modal('show');        
        return false;
    });

    //  ============= Cultura organizacional EDIT FUNCTION =========

    $(".empresa-cultura_org-open").on("click", function(){
        var modal = document.querySelector('#modal-cultura_org');
        $(modal).modal('show');        
        return false;
    });

    //  ============= Políticas de prevención de riesgos EDIT FUNCTION =========

    $(".empresa-politicas_pr-open").on("click", function(){
        var modal = document.querySelector('#modal-politicas_pr');
        $(modal).modal('show');        
        return false;
    });

    //  ============= VALORES EDIT FUNCTION =========

    $(".valor-open").on("click", function(){
        var modal = document.querySelector('#modal-valor');
        $(modal).modal('show');
        return false;
    });

    //  ============= CERTIFICADO EDIT FUNCTION =========

    $(".certificado-open").on("click", function(){
        var modal = document.querySelector('#modal-certificado');
        $(modal).modal('show');
        return false;
    });

    //  ============= ESTABLISH EDIT FUNCTION =========

    $(".esp-bx-open").on("click", function(){
        $("#establish-box").addClass("open");
        $(".wrapper").addClass("overlay");
        return false;
    });
    $(".close-box").on("click", function(){
        $("#establish-box").removeClass("open");
        $(".wrapper").removeClass("overlay");
        return false;
    });

    //  ============= CREATE PORTFOLIO FUNCTION =========

    $(".portfolio-btn > a").on("click", function(){
        $("#create-portfolio").addClass("open");
        $(".wrapper").addClass("overlay");
        return false;
    });
    $(".close-box").on("click", function(){
        $("#create-portfolio").removeClass("open");
        $(".wrapper").removeClass("overlay");
        return false;
    });

    //  ============= EMPLOYEE EDIT FUNCTION =========

    $(".emp-open").on("click", function(){
        $("#total-employes").addClass("open");
        $(".wrapper").addClass("overlay");
        return false;
    });
    $(".close-box").on("click", function(){
        $("#total-employes").removeClass("open");
        $(".wrapper").removeClass("overlay");
        return false;
    });

    //  =============== Ask a Question Popup ============

    $(".ask-question").on("click", function(){
        $("#question-box").addClass("open");
        $(".wrapper").addClass("overlay");
        return false;
    });
    $(".close-box").on("click", function(){
        $("#question-box").removeClass("open");
        $(".wrapper").removeClass("overlay");
        return false;
    });


    //  ============== ChatBox ============== 


    $(".chat-mg").on("click", function(){
        $(this).next(".conversation-box").toggleClass("active");
        return false;
    });
    $(".close-chat").on("click", function(){
        $(".conversation-box").removeClass("active");
        return false;
    });

    //  ================== Edit Options Function =================


    $(".ed-opts-open").on("click", function(){
        $(this).next(".ed-options").toggleClass("active");
        return false;
    });


    // ============== Menu Script =============

    $(".menu-btn > a").on("click", function(){
        $("nav").toggleClass("active");
        return false;
    });


    //  ============ Notifications Open =============

    $(".not-box-open").on("click", function(){$("#message").hide();
        $(".user-account-settingss").hide();
        $(this).next("#notification").toggle();
    });

     //  ============ Messages Open =============

    $(".not-box-openm").on("click", function(){$("#notification").hide();
        $(".user-account-settingss").hide();
        $(this).next("#message").toggle();
    });


    // ============= User Account Setting Open ===========
	/*
$(".user-info").on("click", function(){$("#users").hide();
        $(".user-account-settingss").hide();
        $(this).next("#notification").toggle();
    });
    
	*/
	$( ".user-info" ).click(function() {
  $( ".user-account-settingss" ).slideToggle( "fast");
	  $("#message").not($(this).next("#message")).slideUp();
	  $("#notification").not($(this).next("#notification")).slideUp();
    // Animation complete.
  });
 

    //  ============= FORUM LINKS MOBILE MENU FUNCTION =========

    $(".forum-links-btn > a").on("click", function(){
        $(".forum-links").toggleClass("active");
        return false;
    });
    $("html").on("click", function(){
        $(".forum-links").removeClass("active");
    });
    $(".forum-links-btn > a, .forum-links").on("click", function(){
        e.stopPropagation();
    });
});


