import { PolymerElement, html } 		from "../aw_polymer_3/polymer/polymer-element.js";
import { AwInputErrorMixin } 			from "../aw_form_mixins/aw-input-error-mixin.js";
import { AwFormValidateMixin } 			from "../aw_form_mixins/aw-form-validate-mixin.js";
import { AwExternsFunctionsMixin } 		from "../aw_extern_functions/aw-extern-functions-mixin.js";

import "../aw_polymer_3/iron-icons/image-icons.js";

class AwInputFile extends AwInputErrorMixin( AwFormValidateMixin( AwExternsFunctionsMixin( PolymerElement ))) {
	static get template() {
		return html`
			<style>
				:host {
					position: relative;
					width: 100%;
					padding: 0 0 12px 0;
					margin: 0;
                	font-family: var(--aw-input-font-family, "arial");
					vertical-align: var(--aw-input-vertical-align, middle);
					display: inline-block;
				}

				/* #region Generales */

				.hidden, [hidden], [unresolved] {
					display: none;
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

				/* #region Input visible */

				.container {
					position: relative;
					cursor: pointer;
				}
				.container input#nameArchivo {
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
				.container input#nameArchivo:focus {
					outline: 0;
				}
				.container[focused] input#nameArchivo{
                	outline: 0;
					border-top: var(--aw-input-border-top-focused,var(--aw-input-border-focused,solid 1px var(--aw-primary-color,#1C7CDD)));
					border-right: var(--aw-input-border-right-focused,var(--aw-input-border-focused,solid 1px var(--aw-primary-color,#1C7CDD)));
					border-bottom: var(--aw-input-border-bottom-focused,var(--aw-input-border-focused,solid 1px var(--aw-primary-color,#1C7CDD)));
					border-left: var(--aw-input-border-left-focused,var(--aw-input-border-focused,solid 1px var(--aw-primary-color,#1C7CDD)));
					background-color: var(--aw-input-background-color-focused,var(--aw-input-background-color,transparent));
				}
				.container input#nameArchivo[error]{
					border-top: var(--aw-input-border-top-error,var(--aw-input-border-error,solid 1px var(--aw-error-color,#1C7CDD)));
					border-right: var(--aw-input-border-right-error,var(--aw-input-border-error,solid 1px var(--aw-error-color,#1C7CDD)));
					border-bottom: var(--aw-input-border-bottom-error,var(--aw-input-border-error,solid 1px var(--aw-error-color,#1C7CDD)));
					border-left: var(--aw-input-border-left-error,var(--aw-input-border-error,solid 1px var(--aw-error-color,#1C7CDD)));
					background-color: var(--aw-input-background-color-error,var(--aw-input-background-color,transparent));
				}
				.container input#nameArchivo[disabled]{
					color: var(--aw-input-color-disabled, #BBBBBB);
					border: var(--aw-input-border-disabled,solid 1px #DDDDDD);
					background-color: var(--aw-input-background-color-disabled,#F9F9F9);
				}
				.container input#nameArchivo:-webkit-autofill {
					-webkit-box-shadow: 0 0 0px 1000px white inset !important;
					-webkit-text-fill-color: var(--aw-input-color, #111111);
				}
				.container input#nameArchivo::-webkit-input-placeholder {
					color: var(--aw-input-placeholder-color,#999999);
					font-family: var(--aw-input-placeholder-font-family,var(--aw-input-font-family, "arial"));
					font-style: var(--aw-input-placeholder-font-style,oblique);
				}
				.container input#nameArchivo::-moz-placeholder {
					color: var(--aw-input-placeholder-color,#999999);
					font-family: var(--aw-input-placeholder-font-family,var(--aw-input-font-family, "arial"));
					font-style: var(--aw-input-placeholder-font-style,oblique);
				}
				.container input#nameArchivo::-ms-input-placeholder {
					color: var(--aw-input-placeholder-color,#999999);
					font-family: var(--aw-input-placeholder-font-family,var(--aw-input-font-family, "arial"));
					font-style: var(--aw-input-placeholder-font-style,oblique);
				}
				.container input#nameArchivo::-o-input-placeholder {
					color: var(--aw-input-placeholder-color,#999999);
					font-family: var(--aw-input-placeholder-font-family,var(--aw-input-font-family, "arial"));
					font-style: var(--aw-input-placeholder-font-style,oblique);
				}
				.container input#nameArchivo::-ms-reveal, input::-ms-clear {
					display: none !important;
				}
				.container input#nameArchivo[nospinners]::-webkit-outer-spin-button,
				.container input#nameArchivo[nospinners]::-webkit-inner-spin-button {
					-webkit-appearance: none;
					margin: 0;
				}
				.container input#nameArchivo[nospinners] {
					-moz-appearance:textfield;
				}

				/* #region Botón */

				.container > button {
					position: absolute;
					right: 0px;
					bottom: 0px;
					padding: 0px 5px !important;
					height: 100%;
					margin: 0;
					font-family: var(--aw-button-font-family, "arial") !important;
					font-size: var(--aw-button-font-size, 14px) !important;
					font-weight:  var(--aw-button-font-weight, normal) !important;
					border: solid 1px var(--aw-button-border-color,#1C7CDD) !important;
					border-radius: 0px;
					color: var(--aw-button-color, #FFFFFF) !important;
					background-color: var(--aw-button-bg-color, #1C7CDD) !important;
					transition: color .2s, background .2s, border .2s;
					-webkit-box-sizing: border-box;
					-moz-box-sizing: border-box;
					-ms-box-sizing: border-box;
					box-sizing: border-box;
				}
				
				:host(:hover) .container > button {
					border-color: var(--aw-button-border-color-hv, #1C7CDD) !important;
					background-color: var(--aw-button-bg-color-hv, #1C7CDD) !important;
				}
				
				.container > button[disabled] {
					border-color: var(--aw-input-disabled-color, #BBBBBB) !important;
					background-color: var(--aw-input-disabled-color, #BBBBBB) !important;
				}
				.container > button[error] {
					border-color: var(--aw-input-error-color,var(--aw-error-color,#b13033)) !important;
					background-color: var(--aw-input-error-color,var(--aw-error-color,#b13033)) !important;
				}

				/* region Input File */

				#cont_input {
					position: absolute;
					top: 0px;
					left: 0px;
					width: 100%;
					height: 100%;
				}
				#cont_input input[type=file] {
					position: absolute;
					top: 0px;
					left: 0px;
					width: 100%;
					height: 100%;
					opacity: 0;
					cursor: pointer;
				}
				#cont_input:focus {
					outline: 0;
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

				/* #region Icono */

				.icon {
					position: absolute;
					top: 0;
					left: 0;
					opacity: 0;
					transition: all .2s .2s;
					display: none;
				}
				.icon iron-icon {
					top: var(--aw-input-prefix-icon-top,0);
					fill: var(--aw-input-prefix-color,#555555);
					width: var(--aw-input-prefix-size,22px);
					height: var(--aw-input-prefix-size,22px);
					transition: fill .2s;
				}
				[focused] iron-icon {
					fill: var(--aw-input-prefix-color-focused,var(--aw-input-label-color-focused,var(--aw-primary-color,#1C7CDD)));
				}
				[error] iron-icon {
					fill: var(--aw-input-prefix-color-error,var(--aw-input-label-color-error,var(--aw-error-color,#b13033)));
				}
				:host([disabled]) .icon iron-icon {
					fill: var(--aw-input-prefix-color-disabled,var(--aw-input-color-disabled, #BBBBBB));
				}
				.icon.start {
					left: 0px;
				}
				.icon.end {
					right: 0px;
				}
				[iconstart] .icon.start {
					display: block;
				}
				[iconstart] #label {
					left: 24;
				}
				[iconstart] input {
					padding-left: 24 !important;
				}
			</style>
			<div id="label" hidden="{{!label}}">{{label}}</div>
			<div id="container" class="container">
				<div class="icon start"><iron-icon icon="image:camera-alt"></iron-icon></div>
				<input type="text" id="nameArchivo" on-focus="_focusin" readonly disabled$="[[disabled]]" />
				<button>Selecciona</button>
				<div id="cont_input">
					<label><input
						type="file"
						name="[[name]]"
						multiple$="[[multiple]]"
						disabled$="[[disabled]]"
					
						required$="[[required]]"
						allowed$="[[allowed]]"

						errmsg$="{{errmsg}}"
						
						on-click="_click"
						on-change="_change"
						/></label>
				</div>
			</div>
			<aw-input-error errmsg="{{errmsg}}">{{errmsg}}</aw-input-error>
		`;
	}

	static get properties() {
		return {
			// Elemento del input

			inputVisible: { type: Object, value: null },
			inputElement: { type: Object, value: null },
			buttonFile: { type: Object, value: null },

			// Atributos básicos del input

			id: { type: String },
			name: { type: String },
			value: { type: String },
			multiple: { type: Boolean, value: false },
			disabled: {type: Boolean, value: false, observer: "_set_disabled"},
			autofocus: { type: Boolean, value: false },

			// Atributos de validación

			required: { type: Boolean, value: false },
			allowed: { type: Array },
			novalidate: { type: Boolean, value: false },
			validateonchange: { type: Boolean, value: false },

			// Especiales del aw-input

			label: { type: String, value: "" },
			icon: { type: Boolean, value: false },

			// Relación con el aw-form y el form

			parentForm: Object,
			noregister: { type: Boolean, value: false }	
		}
	}

	/**
	 * @method	connectedCallback
	 * 
	 * Realiza las operaciones al conectar el componente.
	 */
	connectedCallback() {
		super.connectedCallback();
			
		// Cogemos los inputs
		
		this.inputVisible = this.$.container.querySelector( "#nameArchivo" );
		this.buttonFile = this.$.container.querySelector( "button" );
		this.inputElement = this.$.cont_input.querySelector( "input" );
		
		// Inicializamos el componente.

		this._init();

		// Activamos los errores

		this.error_listen();

		// Registramos en el formulario.

		this._register_in_form();

		// Resolvemos

		this.removeAttribute( "unresolved" );
	}

	/**
	 * @method	disconnectedCallback
	 * 
	 * Realiza las operaciones necesarias al desconectar el componente.
	 */
	disconnectedCallback(){
		super.disconnectedCallback();

		// Quitamos el elemento del registro

		if( !this.noregister && this.parentForm ) {
			this.parentForm._unregister_element( this.inputElement );
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
	 * @method	get_files
	 * 
	 * Obtiene los archivos cargados en el input
	 */
	get_files()
	{
		return this.inputElement.files;
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
	 * @method	focus
	 * 
	 * Pone el foco sobre el inputELement.
	 */
	focus() {
		this.inputElement.focus();
	}

	/**
	 * @method	_init
	 * 
	 * Inicializa el componente una vez se ha conectado.
	 */
	_init() {
		// Si no hay label

		if ( !this.label ) {
			this.label = "Selecciona archivos";
		}

		// Ponemos el icono

		if( this.icon ) {
			setTimeout(() => {
				let contIcon = this.shadowRoot.querySelector( ".icon.start" );
				let icon = contIcon.querySelector( "iron-icon" );
				let fontSize = parseInt(window.getComputedStyle(this.inputVisible,null).fontSize.replace("px", ""));
				let paddingLeft = parseInt(window.getComputedStyle(this.inputVisible,null).paddingLeft.replace("px", ""));
				
				if ( fontSize !== 16 ) {
					let alto100 = 16
					let anMod = ( fontSize * 24 ) / alto100;

					icon.style.height = anMod + "px";
					icon.style.width = anMod + "px";
				}


				this.$.container.setAttribute( "iconstart", "" );
				
				contIcon.style.top = ( this.inputVisible.offsetHeight / 2 ) - ( icon.offsetHeight / 2 ) + "px";
				contIcon.style.left = paddingLeft + "px";
				contIcon.style.opacity = "1";
				this.inputVisible.style.paddingLeft = ( paddingLeft + contIcon.offsetWidth + 2 ) + "px";
			}, 10);
		}
	}

	/**
	 * @method	_set_disabled
	 * 
	 * Pone el input en modo disabled.
	 */
	_set_disabled() {
		if ( this.disabled ) {
			this.$.label.setAttribute( "disabled", "" );
			this.buttonFile && this.buttonFile.setAttribute( "disabled", "" );
		} else {
			this.$.label.removeAttribute( "disabled" );
			this.buttonFile && this.buttonFile.removeAttribute( "disabled" );
		}
	}

	/**
	 * @method	_set_input_value
	 * 
	 * Asigna elvalor al input.
	 */
	_set_input_value() {
		// Si hay error detenemos
			
		if( this.error ) {
			this.inputVisible.value = "";
			this.inputElement.value = "";
			return false;
		}

		// Cogemos los nombre de los archivos
			
		var files = this.inputElement.files;
			
		// Ponemos el nombre del archivo
		
		var nombre = "";
		
		for( let i = 0; i < files.length; i++ ) {
			if( i === 0 ) {
				nombre += files[ i ].name;
			} else {
				nombre += ", " + files[ i ].name;
			}
		}
		
		this.inputVisible.value = nombre;

		// Colocamos el label como escrito

		if ( this.inputElement.value.length > 0 ) {
			this.$.label.setAttribute( "writted", "" );
		} else {
			this.$.label.removeAttribute( "writted" );
		}

		// Quitamos el focus a label y baseline

		this.$.label.removeAttribute( "focused" );
		this.$.container.removeAttribute( "focused" );
			
		// Precargamos las imágenes
		
		if( typeof this.preloadfunc === "function" ) {
			this._preload_images();
		}
	}

	/**
	 * @method	_preload_images
	 * 
	 * Precarga las imágenes que hay en el input y las devuelve en un array. Esta
	 * acción se realiza a través de la función externa **preloadfunc**.
	 */
	_preload_images() {
		var files = this.inputElement.files;
		var prevs = [];
		var nav = window.URL || window.webkitURL;
		
		for( let i = 0; i < files.length; i++ ) {
			let file = files[ i ];
			
			if( file.type.match(/image.*/)) {
				var imgPrevSrc = nav.createObjectURL( file );
				prevs.push( imgPrevSrc );
			}
		}
		
		this.preloadfunc( prevs );
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
	 * @method	_click	
	 * 
	 * Acciones a realizar cuando hacemos click.
	 */
	_click() {
		// Invocamos la función externa de change change

		if ( typeof this.clickfunc === "function" ) {
			this.clickfunc( this.inputElement );
		}
	}

	/**
	 * @method	_change
	 * 
	 * Acciones a realizar cuando cambia el input.
	 */
	_change() {
		// Invocamos la función externa de change change

		if ( typeof this.changefunc === "function" ) {
			this.changefunc( this.inputElement );
		}

		// Validamos el input

		if( !this.novalidate || this.validateonchange || ( this.parentForm && !this.parentForm.novalidate )) {
			this.__errorValidateInput( this.inputElement );
		}

		// Asignamos el valor al input

		this._set_input_value();
	}

	/**
	 * @method	_focusin
	 * 
	 * Acciones a realizar cuando se hace focus.
	 */
	_focusin() {
		this.focus();
		this.$.label.setAttribute( "focused", "" );
		this.$.baseline.setAttribute( "focused", "" );
		this.$.container.setAttribute( "focused", "" );
	}

	/**
	 * @method 	_focusout
	 * 
	 * Acciones a realizar cuando se quita el foco.
	 */
	_focusout() {
		this.$.label.removeAttribute( "focused" );
		this.$.baseline.removeAttribute( "focused" );
		this.$.container.removeAttribute( "focused" );
	}
}

window.customElements.define( "aw-input-file", AwInputFile );