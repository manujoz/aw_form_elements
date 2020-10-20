import { PolymerElement, html, Polymer } 	from "../aw_polymer_3/polymer/polymer-element.js";
import { AwFormValidateMixin } 				from "../aw_form_mixins/aw-form-validate-mixin.js";
import { AwExternsFunctionsMixin } 			from "../aw_extern_functions/aw-extern-functions-mixin.js";
import { AwInputErrorMixin } 				from "../aw_form_mixins/aw-input-error-mixin.js";

import "../aw_polymer_3/iron-icons/iron-icons.js";
import "../aw_polymer_3/paper-ripple/paper-ripple.js";
import "../aw_form_helpers/aw-input-error.js";

class AwSelectSearch extends AwInputErrorMixin( AwFormValidateMixin ( AwExternsFunctionsMixin ( PolymerElement ))) {
	static get template() {
		return html`
		<style>
			:host {
				position: relative;
				padding: 0 0 10px 0;
				margin: 0;
				width: 180px;
				font-family: var(--aw-input-font-family, "arial");
				vertical-align: var(--aw-input-vertical-align, middle);
				display: inline-block;
			}

			/* #region Etiqueta del input */

			#label {
				position: relative;
				color: var(--aw-input-color,#333333);
				font-family: var(--aw-input-label-font-family,var(--aw-input-font-family, "arial"));
				font-size: var(--aw-input-label-font-size,var(--aw-input-font-size, 16px));
				font-weight: var(--aw-input-label-font-weight,var(--aw-input-font-weight,normal));
				font-style: var(--aw-input-label-font-style,var(--aw-input-font-style,normal));
				bottom: calc(-8px - var(--aw-input-font-size, 16px));
				transition: bottom .3s, font-size .3s, color .3s, padding .3s;
			}
			#label[writted] {
				bottom: -4px;
				padding-top: calc(var(--aw-input-font-size, 16px) - var(--aw-input-label-font-size-focused,12px));
				font-size: var(--aw-input-label-font-size-focused,12px);
				color: var(--aw-input-label-color-writted,var(--aw-input-label-color,#888888));
			}
			#label[focused] {
				bottom: -4px;
				padding-top: calc(var(--aw-input-font-size, 16px) - var(--aw-input-label-font-size-focused,12px));
				font-size: var(--aw-input-label-font-size-focused,12px);
				color: var(--aw-input-label-color-focused,var(--aw-primary-color,#1C7CDD));
			}
			#label[error] {
				bottom: -4px;
				padding-top: calc(var(--aw-input-font-size, 16px) - var(--aw-input-label-font-size-focused,12px));
				font-size: var(--aw-input-label-font-size-focused,12px);
				color: var(--aw-input-label-color-error,var(--aw-error-color,#b13033));
			}
			#label[disabled] {
				bottom: -4px;
				padding-top: calc(var(--aw-input-font-size, 16px) - var(--aw-input-label-font-size-focused,12px));
				font-size: var(--aw-input-label-font-size-focused,12px);
				color: var(--aw-input-label-color-disabled,var(--aw-input-color-disabled,#BBBBBB));
			}

			/* #region Generales */

			.hidden, [hidden] {
				display: none;
			}

			/* #region Input visible */

			.container {
				position: relative;
			}
			.container[focused] .input_visible {
				background-color: var(--aw-input-background-color-focused,var(--aw-input-background-color,transparent));
			}
			.container[error] .input_visible {
				background-color: var(--aw-input-background-color-error,var(--aw-input-background-color,transparent));
			}
			.container .input_visible {
				width: 100%;
				margin: 0;
				color: var(--aw-input-color,#333333);
				background-color: var(--aw-input-background-color,transparent);
				border: none;
				border-bottom: solid 1px #CCCCCC;
				padding: var(--aw-input-padding,7px 0 3px);
				font-family: var(--aw-input-font-family, "arial");
				font-size: var(--aw-input-font-size, 16px);
				font-weight: var(--aw-input-font-weight,normal);
				font-style: var(--aw-input-font-style,normal);
				text-align: var(--aw-input-text-align, left);
				box-shadow: var(--aw-input-box-shadow,none);
				-webkit-box-sizing: border-box;
				-moz-box-sizing: border-box;
				-ms-box-sizing: border-box;
				box-sizing: border-box;
				transition: all .2s;
			}
			.container .input_visible > img {
				vertical-align: middle;
				width: var(--aw-select-visible-image-width,var(--aw-select-options-image-width,20px));
				margin-top: var(--aw-select-visible-image-margin-top,var(--aw-select-options-image-top,-4px));
				margin-right: var(--aw-select-visible-image-margin-right,var(--aw-select-options-image-right,7px));
			}
			.container .input_visible > iron-icon {
				width: var(--aw-select-visible-icon-width,var(--aw-select-options-icon-width,var(--aw-select-visible-image-width,var(--aw-select-options-image-width,18px))));
				height: var(--aw-select-visible-icon-width,var(--aw-select-options-icon-width,var(--aw-select-visible-image-width,var(--aw-select-options-image-width,18px))));
				fill: var(--aw-select-options-color,var(--aw-input-color, #333333));
				margin-top: var(--aw-select-visible-icon-margin-top,var(--aw-select-options-icon-top,-2px));
				margin-right: var(--aw-select-visible-icon-margin-right,var(--aw-select-options-icon-right,7px));
			}
			.container .input_visible[error]{
				background-color: var(--aw-input-background-color-error,var(--aw-input-background-color,transparent));
			}
			.container .input_visible[disabled]{
				color: var(--aw-input-color-disabled, #BBBBBB);
				background-color: var(--aw-input-background-color-disabled,#F9F9F9);
			}

			/* #region Icono del select */

			#container > iron-icon {
				position: absolute;
				top: var(--aw-select-arrow-top,calc(50% - 12px));
				right: 0px;
				width: 24px;
				height: 24px;
				fill: var(--aw-select-arrow-color, #555555);
			}

			#container > iron-icon[disabled] {
				fill: var(--aw-input-disabled-color, #BBBBBB) !important;
			}

			/* #region Baseline */

			#baseline {
				position: absolute;
				left: 50%;
				bottom: var(--aw-input-baseline-bottom,-1px);
				width: 0;
				height: var(--aw-input-baseline-height,2px);
				background-color: var(--aw-input-baseline-color,var(--aw-input-label-color-focused,var(--aw-primary-color,#1C7CDD)));
				transition: left .3s, width .3s;
			}
			#baseline[focused] {
				width: 100%;
				left: 0;
			}
			#baseline[error] {
				width: 100%;
				left: 0;
				background-color: var(--aw-input-label-color-error,var(--aw-error-color,#b13033));
			}

			/* #region Cobertura */

			.cover {
				position: absolute;
				top: 0px;
				left: 0px;
				width: 100%;
				height: 100%;
			}

			/* #region de opciones */

			.cont_options {
				position: absolute;
				top: 0px;
				left: 0px;
				width: 100%;
				height: 100%;
			}
			#options {
				position: fixed;
				color: var(--aw-select-options-color,var(--aw-input-color, #333333));
				background-color: var(--aw-select-options-background-color, white);
				box-shadow: 0px 1px 2px #777;
				display: none;
				transition: margin .1s, height .2s;
				z-index: 10000;
			}
			.search {
				position: relative;
				border-bottom: solid 1px #DDDDDD;
			}
			.search input {
				padding: 7px 25px 7px 5px;
				width: 100%;
				border: none;
				font-size: var(--aw-input-font-size, 16px);
				box-sizing: border-box;
			}
			.search input:focus {
				outline: 0;
			}
			.search iron-icon {
				position: absolute;
				top: 6px;
				right: 1px;
				width: 18px;
				height: 18px;
				color: #777777;
			}
			#options .inner {
				position: relative;
				max-height: 400px;
				overflow-x: auto;
				scrollbar-width: thin;
				scrollbar-color: #BBBBBB transparent;
			}
			#options .inner::-webkit-scrollbar {
			  	width: 6px;
				height: 6px;
			  	background-color: transparent;
			}
			#options .inner::-webkit-scrollbar-track {
			  	background-color: transparent;
			}
			#options .inner::-webkit-scrollbar-thumb {
			  	background-color: #bbbbbb;
				border-radius: 10px;
			}
			#options::-webkit-scrollbar-thumb:hover {
				background-color: #999999;
			}
			  
			.option {
				position: relative;
				padding: var(--aw-select-options-padding,10px 25px 10px 10px);
				white-space: nowrap;
				text-align: left;
				font-weight: normal;
				font-size: var(--aw-input-font-size, 16px);
				cursor: pointer;
				transition: background .3s;
			}
			.option[preselected] {
				color: var(--aw-select-options-color-hover,var(--aw-input-color, #333333));
				background-color: var(--aw-select-options-background-color-hover, #F0F0F0);
			}
			.option[preselected] > iron-icon {
				fill: var(--aw-select-options-color-hover,var(--aw-input-color, #333333));
			}
			.option[selected] {
				background-color: var(--aw-select-options-background-color-selected,var(--aw-primary-color,#1C7CDD));
				color: var(--aw-select-options-color-selected,white);
			}
			.option[selected] > iron-icon {
				fill: var(--aw-select-options-color-selected,white);
			}

			.option > img {
				vertical-align: middle;
				width: var(--aw-select-options-image-width,20px);
				margin-top: var(--aw-select-options-image-top,-4px);
				margin-right: var(--aw-select-options-image-right,7px);
			}

			.option > iron-icon {
				width: var(--aw-select-options-icon-width,var(--aw-select-options-image-width,20px));
				height: var(--aw-select-options-icon-width,var(--aw-select-options-image-width,20px));
				fill: var(--aw-select-options-color,var(--aw-input-color, #333333));
				margin-top: var(--aw-select-options-icon-top,-2px);
				margin-right: var(--aw-select-options-icon-right,7px);
			}

			input.ghost {
				position: absolute;
				top: 0;
				left: 0;
				width: 0px;
				height: 0px;
				opacity: 0;
			}
		</style>
		<div id="label" hidden="{{!label}}">{{label}}</div>

		<div id="container" class="container">
			<label><input class="ghost" readonly on-focusin="_open_options" /></label>
			<div class="input_visible"disabled$="[[disabled]]">&ensp;</div>
			<iron-icon icon="arrow-drop-down"></iron-icon>
			<div class="cover" on-click="_open_options"></div>
			<div id="baseline"></div>

			<template is="dom-if" if="{{!noink}}">
				<paper-ripple></paper-ripple>
			</template>
		</div>
		<aw-input-error errmsg="{{errmsg}}">{{errmsg}}</aw-input-error>

		<div class="cont_options" on-click="_open_options">
			<div id="options">
				<div class="search">
					<input placeholder="Buscar" on-keyup="_filter_options">
					<iron-icon icon="search"></iron-icon>
				</div>
				<div class="inner">
					<template is="dom-repeat" items="{{options}}" as="option" filter="{{_filtering(string)}}">
						<template is="dom-if" if="{{option.noicon}}">
							<div class="option" style$="{{option.style}}" value$="{{option.value}}" selected$="{{option.selected}}" title$="{{option.title}}" on-click="_select_option" on-mouseover="_hover">{{option.inner}}</div>
						</template>
						<template is="dom-if" if="{{option.image}}">
							<div class="option" style$="{{option.style}}" value$="{{option.value}}" selected$="{{option.selected}}" title$="{{option.title}}" on-click="_select_option" on-mouseover="_hover"><img src="{{option.image}}">{{option.inner}}</div>
						</template>
						<template is="dom-if" if="{{option.iron}}">
							<div class="option" style$="{{option.style}}" data-icon$="{{option.iron}}" value$="{{option.value}}" selected$="{{option.selected}}" title$="{{option.title}}" on-click="_select_option" on-mouseover="_hover"><iron-icon icon="{{option.iron}}"></iron-icon>{{option.inner}}</div>
						</template>
					</template>
				</div>
			</div>
		</div>

		<div class="hidden">
			<input
				id$=[[id]]
				name$=[[name]]
                autocomplete$="[[autocomplete]]"
				value$="{{value}}"
				type="hidden"

                required$="[[required]]"
                novalidate$=[[novalidate]]

                on-focusin="_openOptions"
				/>
		</div>
		`;
	}

	static get properties() {
		return {
			inputElement: { type: Object },
			inputVisible: { type: Object },
			inputSearch: { type: Object },

			// Atributos básicos del input

			id: { type: String },
			name: { type: String },
			autocomplete: { type: String, value: "off" },
			value: { type: String },
			disabled: {type: Boolean, value: false, observer: "_set_disabled"},

			// Atributos de diseño

			label: { type: String },

			// Atributos especiales del aw-select
			
			noink: { type: Boolean, value: false },
			autofocus: { type: Boolean, value: false },
			noink: { type: Boolean, value: false },
			colors: { type: Boolean, value: false },
			opened: { type: Boolean, value: false },
			selectedindex: { type: Number, value: "", observer: "_change_selectedindex" },
			selectedvalue: { type: String, value: "", observer: "_change_selectedvalue" },

			// Atributos de funcionamiento

			width: { type: Number },
			height: { type: Number },
			scrolltop: { type: Number },
			options_obj: { type: Array, value: [] },

			// Atributos de validación

			required: { type: Boolean, value: false },
			novalidate: { type: Boolean, value: false },
			validateonchange: { type: Boolean, value: false },

			// Listeners

			selected: { type: String },
			listenDoc: { type: String, value: "" },
			listenKeys: { type: String, value: "" },
			listenScroll: { type: String, value: "" },
			writtedopen: { type: String, value: "" },
			observOpts: { Object },

			// Relación con el aw-form y el form

			parentForm: { type: Object },
			noregister: { type: Boolean, value: false },

			// String de filtrado

			string: { type: String, value: "" },
			isupper: { type: Boolean, value: false }
		};
	}

	/**
	 * @method	connectedCallback
	 * 
	 * Realiza las operaciones al conectar el componente.
	 */
	connectedCallback() {
		super.connectedCallback();

		// Asignamos los inputs del componente

		this.inputElement = this.shadowRoot.querySelector( ".hidden input" );
		this.inputVisible = this.shadowRoot.querySelector( ".input_visible" );
		this.inputSearch = this.shadowRoot.querySelector( ".search input" );

		// Creamos las opciones

		this._create();

		// Activamos los errores

		this.error_listen();

		// Registramos en el formulario.

		this._register_in_form();

		// Escuchamos el cambio de los options

		this.observOpts = new MutationObserver( this._observer_options.bind( this ));
		this.observOpts.observe( this, { childList: true } );

		// Listener del document y teclado

		this.listenDoc = this._close_options.bind( this );
		this.listenKeys = this._handdle_keys.bind( this );
		this.listenScroll = this._scroll_event.bind( this );

		// Resolvemos

		this.removeAttribute( "unresolved" );
	}

	/**
	 * @method	disconnectedCallback
	 * 
	 * Realiza las operaciones necesarias al desconectar el componente.
	 */
	disconnectedCallback() {
		super.disconnectedCallback();

		// Dejamos de escuchar el evento del click en el documento y keyup

		document.removeEventListener( "click", this.listenDoc );
		document.removeEventListener( "keyup", this.listenKeys );

		// Dejamos de escuchar el cambio de los options

		this.observOpts.disconnect();

		// Quitamos el elemento del registro

		if( !this.noregister && this.parentForm ) {
			this.parentForm._unregister_element( this.$.input );
		}
	}

	/**
	 * @method error_hide
	 * 
	 * Muestra u oculta un mensaje de error
	 */
	error_hide()
	{
		this.inputElement.setAttribute( "errmsg", "" );
	}

	/**
	 * @method error_show
	 * 
	 * Muestra u oculta un mensaje de error
	 * 
	 * @param {string} message Mensaje de error que se va a mostrar
	 */
	error_show( message )
	{
		this.inputElement.setAttribute( "errmsg", message );
	}

	/**
	 * @method get_value
	 * 
	 * Obtiene el valor del input
	 * 
	 * @return {string}
	 */
	get_value()
	{
		return this.inputElement.value;
	}

	/**
	 * @method	has_error
	 * 
	 * Devuelve si el campo tiene un error
	 * 
	 * @return {boolean}
	 */
	has_error()
	{
		if( this.inputElement.getAttribute( "errmsg" )) {
			return true;
		} else {
			return false;
		}
	}

	/**
	 * @method	reload
	 * 
	 * Refresca los options dentro del componente si cambiaron en el aw-select
	 */
	reload() {
		this.selected = "";
		this.inputElement.value = "";
		this.inputVisible.value = "";
		this.$.label.removeAttribute( "writted" );

		this._create();
	}

	/**
	 * @method	_create	
	 * 
	 * Crea las opciones del aw-select.
	 */
	_create() {
		// Cogemos los options
			
		this.options = [];
		var opts = this.querySelectorAll( "option" );

		for( let i = 0; i < opts.length; i++ ) {
			let selected = false;

			if( !selected && (( parseInt(this.selectedindex) === i && !this.selectedvalue ) || ( this.selectedvalue && this.selectedvalue === opts[ i ].value ))) {
				selected = true;
				this.selected = opts[ i ].value;
				this.inputElement.value = opts[ i ].value;
				this.$.label.setAttribute( "writted", "" );

				if( opts[ i ].dataset.iron ) {
					this.inputVisible.innerHTML = '<iron-icon icon="' + opts[ i ].dataset.iron + '"></iron-icon>' + opts[ i ].innerHTML;
				} else if( opts[ i ].dataset.img ) {
					this.inputVisible.innerHTML = '<img src="' + opts[ i ].dataset.img + '">' + opts[ i ].innerHTML;
				} else {
					this.inputVisible.innerHTML = opts[ i ].innerHTML;
				}
			}

			var obj = {
				el: opts[ i ],
				value: opts[ i ].value,
				inner: opts[ i ].innerHTML,
				title: opts[ i ].getAttribute( "title" ),
				selected: selected,
				iron: opts[ i ].dataset.iron,
				image: ( !opts[ i ].dataset.iron ) ? opts[ i ].dataset.img : "",
				noicon: ( !opts[ i ].dataset.img && !opts[ i ].dataset.iron ) ? true : false,
				style: ( this.colors ) ? "color: " + opts[ i ].value + " !important; background-color: " + opts[ i ].value + " !important;"  : ""
			}

			this.options.push( obj );
		}

		this.options_obj = this.options;
		this.width = this.offsetWidth;

		// Ajustamoe el input de búsqueda

		var paddingTop = parseInt( window.getComputedStyle( this.inputVisible, null ).paddingTop.replace( "px", "" ));
		var paddingBottom = parseInt( window.getComputedStyle( this.inputVisible, null ).paddingTop.replace( "px", "" ));
		var borderTop = parseInt( window.getComputedStyle( this.inputVisible, null ).borderTopWidth.replace( "px", "" ));
		var borderBottom = parseInt( window.getComputedStyle( this.inputVisible, null ).borderTopWidth.replace( "px", "" ));

		this.inputSearch.style.paddingTop = (paddingTop + borderTop) + "px";
		this.inputSearch.style.paddingBottom = (paddingBottom + borderBottom) + "px";
		this.shadowRoot.querySelector( ".search iron-icon" ).style.top = (paddingTop + borderTop - 1) + "px";

		// Cogemos las dimensiones de los options

		setTimeout(() => {
			var divOpts = this.$.options;
			var clon = divOpts.cloneNode( true );
			clon.style.display = "block";

			// Creamos el elemento provisional e introducimos el clon

			var prov = document.createElement( "DIV" );
			prov.style.position = "absolute";
			prov.style.zIndex = "-1000";
			prov.style.opacity = "0";

			prov.appendChild( clon );

			divOpts.parentElement.appendChild( prov );

			// Asignamos el ancho y el alto

			this.height = clon.offsetHeight;

			// Eliminamos el elemento provisional

			if( prov.parentNode ) {
				prov.parentNode.removeChild( prov );
			}
		}, 500);
		
		// Asignamos el color si corresponde

		this._set_color();
	}

	/**
	 * @method	_set_disabled
	 * 
	 * Pone el componente en estado desactivado
	 */
	_set_disabled() {
		if ( this.disabled ) {
			this.$.container.querySelector( "iron-icon" ).setAttribute( "disabled", "" );
			this.$.label.setAttribute( "disabled", "" );
			this.noink = true;
		} else {
			this.$.container.querySelector( "iron-icon" ).removeAttribute( "disabled" );
			this.$.label.removeAttribute( "disabled" );
			this.noink = false;
		}
	}

	/**
	 * @method	_open_options
	 * 
	 * Abre las opcions del select.
	 * 
	 * @param	{object}	ev			Evento devuelto al hacer focus.
	 */
	_open_options( ev ) {
		ev.stopPropagation();

		// Invocamos la función externa de click

		if ( typeof this.clickfunc === "function" ) {
			this.clickfunc( this.inputElement );
		}

		// Si esta abierta o es disabled paramos

		if( this.opened || this.disabled ) {
			return false;
		}

		// Marcamos que está abierto y guardamos el scrollTop

		this.opened = true;
		this._set_scrolltop();

		// Ponemos el focus

		this.$.label.setAttribute( "focused", "" );
		this.$.baseline.setAttribute( "focused", "" );
		this.$.container.setAttribute( "focused", "" );

		// Mostramos los options

		this._slide_element();

		// Ajsutamos la posición

		this._set_position();

		// Ponemos el preseleccionado

		if( this.selected ) {
			this.$.options.querySelector( ".option[selected]" ).setAttribute( "preselected", "" );
		} else {
			this.$.options.querySelector( ".option" ).setAttribute( "preselected", "" );
		}

		// Ponemos a la escucha el click y el scroll en el documento

		document.addEventListener( "click", this.listenDoc );
		document.addEventListener( "keydown", this.listenKeys );
		window.addEventListener( "scroll", this.listenScroll );
		
		this._get_scrollables();

		for( let i = 0; i < this.scrollables.length; i++ ) {
			this.scrollables[ i ].el.addEventListener( "scroll", this.listenScroll );
		}

		// Ponemos el focus en el input de búsqueda

		this.inputSearch.focus();

		// Vamos a la opción seleccionada

		this._go_to_select_options();
	}

	/**
	 * @method	_close_options
	 * 
	 * Cierra las opciones del componente
	 */
	_close_options( ev ) {
		if( ev && ev.path && ev.path[ 1 ].classList.contains( "search" )) {
			return false;
		}
		
		// Marcamos que está abierto

		this.opened = false;

		// Quitamos el focus

		this.$.label.removeAttribute( "focused" );
		this.$.baseline.removeAttribute( "focused" );
		this.$.container.removeAttribute( "focused" );

		if( this.inputElement.value ) {
			this.$.label.setAttribute( "writted", "" );
			this.$.baseline.setAttribute( "writted", "" );
		}

		// Quitamos el style para ocultar las opciones

		this.$.options.removeAttribute( "style" );

		// Quitamos el preseleccionad

		var options = this.$.options.querySelectorAll( ".option" );

		for( let i = 0; i < options.length; i++ ) {
			options[ i ].removeAttribute( "preselected" );
		}

		// Dejamos de escuchar el evento del click y scroll en el documento

		document.removeEventListener( "click", this.listenDoc );
		document.removeEventListener( "keydown", this.listenKeys );
		window.removeEventListener( "scroll", this.listenScroll );
		
		this._get_scrollables();
		
		for( let i = 0; i < this.scrollables.length; i++ ) {
			this.scrollables[ i ].el.removeEventListener( "scroll", this.listenScroll );
		}

		// Limpiamos las oopciones

		this.inputSearch.value = "";
		this._filter_options();
	}

	/**
	 * @method	_select_option
	 * 
	 * Seleccinoa una opción del componente cuando se hace click o se pulsa intro
	 * 
	 * @param	{object}		ev			Evento devuelto en el listener
	 * @param	{object}		el			Elemento sobre el que interactua el evento
	 */
	_select_option( ev, el ) {
		this.writtedopen = "";

		this.inputSearch.value = "";
		this._filter_options();

		// Cogemos el elemento seleccionado

		if( ev ) {
			var opt = ev.target;
		} else {
			var opt = el;
		}

		while( opt.tagName !== "DIV" ) {
			opt = opt.parentElement;
		}

		// Asiganmos el value

		var value = opt.getAttribute( "value" );

		// Comprobamos si hay cambiado

		if ( value === this.selected ) {
			return false;
		} else {
			this.selected = value;
		}

		// Rellenamos el valor

		this.inputElement.value = opt.getAttribute( "value" );
		this.shadowRoot.querySelector( "input.ghost" ).blur();

		// Introducimos el input visible
		let inner = opt.innerHTML;
		if( opt.querySelector( "iron-icon" )) {
			let clone = document.createElement( "DIV" );
			clone.innerHTML = opt.innerHTML;

			clone.querySelector( "iron-icon" ).parentElement.removeChild( clone.querySelector( "iron-icon" ) );
			inner = '<iron-icon icon="' + opt.dataset.icon + '"></iron-icon>' + clone.innerHTML;
		}
		this.inputVisible.innerHTML = ( inner ) ? inner : "&ensp;";
		
		// Asignamos el color si corresponde

		this._set_color();

		// Modificamos el seleccionad

		var options = this.$.options.querySelectorAll( ".option" );

		for( let i = 0; i < options.length; i++ ) {
			if( options[ i ].getAttribute( "value" ) === value ) {
				options[ i ].setAttribute( "selected", "" );
			} else {
				options[ i ].removeAttribute( "selected" );
			}
		}

		setTimeout(() => {
			this._close_options();
		}, 50);

		// lanzamos el cambio

		this._change();
	}

	/**
	 * @method	_go_to_select_options
	 * 
	 * Lleva a la parte visible la opción seleccionada cuando se abren las opciones.
	 */
	_go_to_select_options() {
		var optSel = this.$.options.querySelector( "div[selected]" );
		
		if( !optSel ) {
			return false;
		}

		if( optSel.getAttribute( "value" ) != this.inputElement.value ) {
			optSel.removeAttribute( "selected" );

			let options = this.$.options.querySelectorAll( ".option" );
			for( let i = 0; i < options.length; i++ ) {
				if( options[ i ].getAttribute( "value" ) == this.inputElement.value ) {
					optSel = options[ i ];
				}
			}

			optSel.setAttribute( "selected", "" );
		}

		var top = optSel.offsetTop;
		this.$.options.querySelector( ".inner" ).scrollTop = top - 70;
	}

	/** 
	 * @method	_go_to_preselected_option
	 * 
	 * Se desliza según el preseleccionado
	 */
	_go_to_preselected_option()
	{
		let inner = this.$.options.querySelector( ".inner" );
		var optSel = this.$.options.querySelector( "div[preselected]" );
		var optTop = optSel.offsetTop;
		let bottomInner = inner.scrollTop + inner.offsetHeight;

		if( optTop + optSel.offsetHeight > bottomInner ) {
			inner.scrollTop = optTop + optSel.offsetHeight - optSel.offsetHeight - ( inner.offsetHeight - optSel.offsetHeight);
		} else if( optTop < inner.scrollTop ) {
			inner.scrollTop = optTop;
		}
	}

	/**
	 * @method	_handdle_keys
	 * 
	 * Maneja el control del teclado sobre el componente
	 * 
	 * @param	{object}		ev			Evento devuelto en el listener
	 */
	_handdle_keys( ev ) {
		if( ev.keyCode == 38 || ev.keyCode == 40 || ev.keyCode == 13 ) {
			ev.preventDefault();
		}

		// Cogemos los options y el seleccionado

		var options = this.$.options.querySelectorAll( ".option" );
		var preselected = this.$.options.querySelector( ".option[preselected]" );

		if( !preselected ) {
			if( options.length > 0 ) {
				for( let i = 0; i < options.length; i++ ) {
					if( options[ i ].tagName === "DIV" ) {
						options[ i ].setAttribute( "preselected", "" );
						break;
					}
				}
			}
			
			return false;
		}

		// Si pulamos arriba

		if( ev.keyCode === 38 ) {
			preselected.removeAttribute( "preselected" );

			let prev = preselected.previousElementSibling;
			while( prev ) {
				if( prev.tagName === "DIV" ) {
					break;
				}

				prev = prev.previousElementSibling;
			}

			if( prev ) {
				prev.setAttribute( "preselected", "" );
			} else {
				for( let i = options.length - 1; i >= 0; i-- ) {
					if( options[ i ].tagName === "DIV" ) {
						options[ i ].setAttribute( "preselected", "" );
						break;
					}
				}
			}

			this._go_to_preselected_option();
		} else

		// Si pulsamos abajo

		if( ev.keyCode === 40 ) {
			preselected.removeAttribute( "preselected" );
			
			let next = preselected.nextElementSibling;
			while( next ) {
				if( next.tagName === "DIV" ) {
					break;
				}

				next = next.nextElementSibling;
			}

			if( next ) {
				next.setAttribute( "preselected", "" );
			} else {
				for( let i = 0; i < options.length; i++ ) {
					if( options[ i ].tagName === "DIV" ) {
						options[ i ].setAttribute( "preselected", "" );
						break;
					}
				}
			}

			this._go_to_preselected_option();
		} else

		// Si pulsamos intro

		if( ev.keyCode === 13 || ev.keyCode == 9 ) {
			preselected.removeAttribute( "preselected" );
			this._select_option( "", preselected );
			ev.preventDefault();
		}
	}
	
	/**
	 * @method _filter_options
	 * 
	 * Escucha la escritura en el input de buscar.
	 */
	_filter_options() {
		this.string = this.inputSearch.value;
	}

	/**
	 * @method	_filtering
	 * 
	 * Filtra las opciones en función del contenido que se haya introducido en el 
	 * input.
	 * 
	 * @param	{string}	string			Valor del input.
	 */
	_filtering( string ) {
		// Función de resposiconamiento

		var repos = () => {
			var options = this.$.options;
			let diff = options.offsetHeight + this.scrolltop - this.inputVisible.offsetHeight;
			options.style.marginTop = "-" + diff + "px";
		}

		// Funución de reemplazar
		
		var replace = ( string ) => {
			var result = string.replace( new RegExp( "(à|á|ä|â)", "g" ), "a" );
			result = result.replace( new RegExp( "(è|á|ë|ê)", "g" ), "e" );
			result = result.replace( new RegExp( "(ì|í|ï|î)", "g" ), "i" );
			result = result.replace( new RegExp( "(ò|ó|ö|ô)", "g" ), "o" );
			result = result.replace( new RegExp( "(ù|ú|ü|û)", "g" ), "u" );

			return result;
		}

		// Filtramos el string

		if ( !string ) {
			if( this.isupper ) {
				setTimeout(() => {
					repos();
				}, 10);
			}
			return null;
		} else {
			string = replace( string.toLowerCase());

			return ( option ) => {
				var value = replace( option.value.toLowerCase());
				var inner = replace( option.inner.toLowerCase());

				if( this.isupper ) {
					setTimeout(() => {
						repos();
					}, 10);
				}
				
				return (value.indexOf( string ) != -1 || inner.indexOf(string) != -1);
			}
		}
	}

	/**
	 * @method	_set_color
	 * 
	 * Asigna el color si el campo es tipo colors
	 */
	_set_color() {
		if( !this.inputElement.value ) {
			return false;
		}

		var value = this.inputElement.value;

		if( this.colors ) {
			var contrast = Polymer.Colors.contrast( value );
			var cColor = "#555555";
			if( contrast == "dark" ) {
				cColor = "white";
			}
			
			this.inputVisible.setAttribute( "style", "color: " + value + " !important; background-color: " + value + " !important;" );
		}
	}

	/**
	 * @method	_change_selectedindex
	 * 
	 * Cambia el indice seleccionado cuando se cambia el atributo de aw-select
	 * 
	 * @param	{object}		ev			Evento devuelto en el listener
	 */
	_change_selectedindex() {
		if( this.options_obj.length == 0 ) {
			return false;
		}

		for( var i = 0; i < this.options_obj.length; i++ ) {
			if( i === this.selectedindex ) {
				this.options_obj[ i ].selected = true;
				this._select_option( "", this.options_obj[ i ].el );
				return false;
			}
		}
	}

	/**
	 * @method	_change_selectedvalue
	 * 
	 * Cambia el valor seleccionado cuando se cambia el atributo de aw-select
	 * 
	 * @param	{object}		ev			Evento devuelto en el listener
	 */
	_change_selectedvalue() {
		if( this.options_obj.length == 0 ) {
			return false;
		}

		for( var i = 0; i < this.options_obj.length; i++ ) {
			if( this.options_obj[ i ].value === this.selectedvalue ) {
				this.options_obj[ i ].selected = true;
				this._select_option( "", this.options_obj[ i ].el );
				return false;
			}
		}
	}

	/**
	 * @method	_slide_element
	 * 
	 * Anima la apertura del componente
	 */
	_slide_element() {
		this.$.options.style.height = "0px";
		this.$.options.style.transition = "height .15s ease";
		this.$.options.style.overflow = "hidden";
		this.$.options.style.display = "block";

		setTimeout(() => {
			this.$.options.style.height = this.height + "px";
		});

		setTimeout(() => {
			this.$.options.style.height = "";
			this.$.options.style.transition = "";
			this.$.options.style.overflow = "";
		}, 150);
	}

	/**
	 * @method	_set_scrolltop
	 * 
	 * Asigna el scrolltop teniendo en cuenta el scrolltop de la ventana así como
	 * el scrolltop de los padres si tienen algún tipo de overflow.
	 */
	_set_scrolltop() {
		this.scrolltop = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;

		var parent = this.parentElement;
		while( parent.tagName !== "BODY" ) {
			this.scrolltop += parent.scrollTop;
			parent = parent.parentElement;
		}
	}

	/**
	 * @method	_set_position
	 * 
	 * Asigna la posición de las opciones cuando se abren
	 * 
	 * @param	{object}		ev			Evento devuelto en el listener
	 */
	_set_position() {
		this.isupper = false;

		var options = this.$.options;
		var position = this.getBoundingClientRect();

		options.style.width = this.offsetWidth + "px";
		options.style.marginTop = "-" + this.scrolltop + "px";
		options.style.marginLeft = (this.offsetWidth - options.offsetWidth) + "px";
		
		if( this.height > window.innerHeight - 40 ) {
			options.style.marginTop = "-" + ( position.top + this.scrolltop - 20 )+ "px";

			setTimeout(() => {
				options.style.height = (window.innerHeight - 40)  + "px";
			}, 150);

		} else if( position.top + this.height > window.innerHeight - 20 ) {
			let diff = this.height + this.scrolltop - this.inputVisible.offsetHeight;
			options.style.marginTop = "-" + diff + "px";
			this.isupper = true;
		}
	}

	/**
	 * @method	_get_scrollables
	 * 
	 * Obtiene los elementos scrollables que están por encima del componente
	 */
	_get_scrollables() {
		this.scrollables = [];
		let parent = this.parentElement;
		while( parent.tagName != "BODY" ) {
			if( parent.clientHeight < parent.scrollHeight ) {
				this.scrollables.push({
					el: parent,
					scroll: parent.scrollTop
				});
			}
			parent = parent.parentElement;
		}
	}

	/**
	 * @method	_scroll_event
	 * 
	 * Evita el scroll de la página cuando están abiertas las opciones.
	 * 
	 * @param	{object}		ev			Evento devuelto en el listener
	 */
	_scroll_event( ev ) {
		for( let i = 0; i < this.scrollables.length; i++ ) {
			this.scrollables[ i ].el.scroll( 0 , this.scrollables[ i ].scroll );
		}

		window.scroll( 0, this.scrolltop );
	}

	/**
	 * @method	_observer_options
	 * 
	 * Observa el cambio de los options en el aw-select y los refresca automáticamente
	 */
	_observer_options() {
		this.reload();
	}

	/**
	 * @method	_register_in_form
	 * 
	 * Registra el elemento en el formulario.
	 */
	_register_in_form() {
		// Si no debe registrarse

		if( this.noregister ) {
			return false;
		}

		// Registramos el elemento

		this.dispatchEvent(new CustomEvent('aw-form-element-register', { detail: this, bubbles: true, composed: true }));
	}

	/**
	 * @method	_hover
	 * 
	 * Realiza el efecto al pasar el ratón por encima de las opciones.
	 * 
	 * @param	{object}		ev 			Evento devuelto por el mousehover.
	 */
	_hover( ev ) {
		// Modificamos el preseleccionad

		var options = this.$.options.querySelectorAll( ".option" );

		for( let i = 0; i < options.length; i++ ) {
			options[ i ].removeAttribute( "preselected" );
		}

		ev.target.setAttribute( "preselected", "" );
	}

	/**
	 * @method	_change
	 * 
	 * Controla el cambio del valor del campo
	 */
	_change() {
		// Ponemos/quitamos el writted

		if( this.inputElement.value ) {
			this.$.label.setAttribute( "writted", "" );
		} else {
			this.$.label.removeAttribute( "writted" );
		}

		// Invocamos la función externa de change change

		if ( typeof this.changefunc === "function" ) {
			setTimeout(() => {
				this.changefunc( this.inputElement );
			}, 200);
		}
	}
}

window.customElements.define( "aw-select-search", AwSelectSearch );