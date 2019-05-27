import { PolymerElement, html, Polymer } 	from "../aw_polymer_3/polymer/polymer-element.js";
import { AwInputErrorMixin } 				from "../aw_form_mixins/aw-input-error-mixin.js";
import { AwInputCharCounterMixin } 			from "../aw_form_mixins/aw-char-counter-mixin.js";
import { AwFormValidateMixin } 				from "../aw_form_mixins/aw-form-validate-mixin.js";
import { AwExternsFunctionsMixin } 			from "../aw_extern_functions/aw-extern-functions-mixin.js";

class AwTextarea extends AwInputErrorMixin( AwInputCharCounterMixin ( AwFormValidateMixin ( AwExternsFunctionsMixin ( PolymerElement )))) {
	static get template() {
		return html`
			<style>
				:host {
					position: relative;
					width: 100%;
					padding: 0 0 10px 0;
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
					transition: bottom .3s, font-size .3s, color .3s;
				}
				#label[writted] {
					bottom: -4px;
					font-size: var(--aw-input-label-font-size-focused,12px);
					color: var(--aw-input-label-color-writted,var(--aw-input-label-color,#888888));
				}
				#label[focused] {
					bottom: -4px;
					font-size: var(--aw-input-label-font-size-focused,12px);
					color: var(--aw-input-label-color-focused,var(--aw-primary-color,#1C7CDD));
				}
				#label[error] {
					bottom: -4px;
					font-size: var(--aw-input-label-font-size-focused,12px);
					color: var(--aw-input-label-color-error,var(--aw-error-color,#b13033));
				}
				#label[disabled] {
					bottom: -4px;
					font-size: var(--aw-input-label-font-size-focused,12px);
					color: var(--aw-input-label-color-disabled,var(--aw-input-color-disabled,#BBBBBB));
				}

				/* #region Input visible */

				.container {
					position: relative;
				}
				.container textarea {
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
					resize: none;
					vertical-align: top;
				}
				.container textarea:focus{
                	outline: 0;
					background-color: var(--aw-input-background-color-focused,var(--aw-input-background-color,transparent));
				}
				.container textarea[error]{
					background-color: var(--aw-input-background-color-error,var(--aw-input-background-color,transparent));
				}
				.container textarea[disabled]{
					color: var(--aw-input-color-disabled, #BBBBBB);
					background-color: var(--aw-input-background-color-disabled,#F9F9F9);
				}
				.container textarea::-webkit-scrollbar {
					width: 8px;
					height: 8px;
					background-color: #f0f0f0;
				}
				.container textarea::-webkit-scrollbar-track {
					background-color: #f0f0f0;
				}
				.container textarea::-webkit-scrollbar-thumb {
					background-color: #bbbbbb;
				}
				.container textarea::-webkit-scrollbar-thumb:hover {
					background-color: #999999;
				}
				.container textarea:-webkit-autofill {
					-webkit-box-shadow: 0 0 0px 1000px white inset !important;
					-webkit-text-fill-color: var(--aw-input-color, #111111);
				}
				.container textarea::-webkit-input-placeholder {
					color: var(--aw-input-placeholder-color,#999999);
					font-family: var(--aw-input-placeholder-font-family,var(--aw-input-font-family, "arial"));
					font-style: var(--aw-input-placeholder-font-style,oblique);
				}
				.container textarea::-moz-placeholder {
					color: var(--aw-input-placeholder-color,#999999);
					font-family: var(--aw-input-placeholder-font-family,var(--aw-input-font-family, "arial"));
					font-style: var(--aw-input-placeholder-font-style,oblique);
				}
				.container textarea::-ms-input-placeholder {
					color: var(--aw-input-placeholder-color,#999999);
					font-family: var(--aw-input-placeholder-font-family,var(--aw-input-font-family, "arial"));
					font-style: var(--aw-input-placeholder-font-style,oblique);
				}
				.container textarea::-o-input-placeholder {
					color: var(--aw-input-placeholder-color,#999999);
					font-family: var(--aw-input-placeholder-font-family,var(--aw-input-font-family, "arial"));
					font-style: var(--aw-input-placeholder-font-style,oblique);
				}
				.container textarea::-ms-reveal, input::-ms-clear {
					display: none !important;
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

				/* #region Flexible de error y contador */

				.flex_inf {
					position: relative;
					padding: 2px 0 0;
					display: flex;
					flex: row wrap;
				}

				.flex_inf > .left {
					position: relative;
					flex-grow: 1;
					flex-basis: auto;
				}

				.flex_inf > .right {
					position: relative;
					flex-grow: 0;
					flex-basis: auto;
				}
			</style>
			<div id="label" hidden="{{!label}}">{{label}}</div>
			<div id="container" class="container">
				<label><textarea
					id$="[[id]]"
					name$="[[name]]"
					rows$="[[rows]]" 
					placeholder="[[placeholder]]"
					minlength$="[[minlength]]"
					maxlength$="[[maxlength]]"
					readonly$="[[readonly]]"
					disabled$="[[disabled]]"
					autocapitalize$="[[autocapitalize]]"
					autocorrect$="[[autocorrect]]"
					autocomplete$="[[autocomplete]]"
					
					required$="[[required]]"
					nospaces$="[[nospaces]]"
					novalidate$=[[novalidate]]

					errmsg$="{{errmsg}}"
					on-focusin="_focusin"
					on-focusout="_focusout"
					on-keyup="_keyup"
					on-keypress="_keypress"
					on-change="_change"
					>{{value}}</textarea></label>

				<div id="baseline"></div>
			</div>
			<div class="flex_inf">
				<div class="left">
					<aw-input-error errmsg="{{errmsg}}">{{errmsg}}</aw-input-error>
				</div>
				<div class="right">
					<aw-char-counter unresolved hidden="{{!countchar}}">{{countCharStr}}</aw-char-counter>
				</div>
			</div>
		`;
	}

	static get properties() {
		return {
			// Elemento del input

			inputElement: { type: Object, value: null },

			// Atributos básicos del input

			id: { type: String },
			name: { type: String },
			rows: { type: String, value: "1" },
			placeholder: { type: String },
			autocomplete: { type: String, value: "off" },
			minlength: { type: Number },
			maxlength: { type: Number },
			value: { type: String },
			autocorrect: String,
			readonly: {type: Boolean, value: false, observer: "_set_readonly"},
			disabled: {type: Boolean, value: false, observer: "_set_disabled"},

			// Atributos de validación

			required: { type: Boolean, value: false },
			nospaces: { type: String },
			novalidate: { type: Boolean, value: false },
			validateonchange: { type: Boolean, value: false },

			// Atributos de diseño

			label: { type: String, value: "" },
			autofocus: { type: Boolean, value: false },

			// Especiales del aw-textarea

			noadjust: { type: Boolean, value: false },
			maxheight: { type: Number, value: 0 },

			// Relación con el aw-form y el form

			parentForm: Object,
			noregister: { type: Boolean, value: false }
		};

	}

	/**
	 * @method	connectedCallback
	 * 
	 * Realiza las operaciones al conectar el componente.
	 */
	connectedCallback() {
		super.connectedCallback();

		// Asignamos el elemento

		this.inputElement = this.shadowRoot.querySelector( "textarea" );

		// Inicializamos el componente.

		this._init();

		// Hacemos ajustable el textarea
			
		this._textarea_adjust();

		// Activamos los errores

		this.error_listen();

		// Activamos el countchar

		this.set_countchar();

		// Registramos en el formulario.

		this._register_in_form();

		// Invocamos la función externa connected

		if ( typeof this.connectedfunc === "function" ) {
			this.connectedfunc( this );
		}

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
	 * @method	_init
	 * 
	 * Inicializa el componente una vez se ha conectado.
	 */
	_init() {
		// Ponemos el value si viene dado.
		
		/*
		NOTE: Desactivado de mommento a la espera de su necesidad.
		
		if ( this.value ) {
			let eventKeyUp = new Event( "keyup" );

			this.inputElement.value = this.value;
			this.inputElement.dispatchEvent( eventKeyUp );
			this.inputElement.blur();
			this._keyup();

			eventKeyUp = null;
		}*/

		//  Ponemos el autofocus
		
		if( this.autofocus && !this.readonly && !this.disabled ) {
			setTimeout(() => {
				this.focus();
			},100);
		}
	}

	/**
	 * @method	focus
	 * 
	 * Pone el foco sobre el input.
	 */
	focus() {
		this.inputElement.focus();
		this.inputElement.selectionStart = this.inputElement.selectionEnd = this.inputElement.value.length;
	}

	/**
	 * @method	_set_readonly
	 * 
	 * Pone el input como solo lectura.
	 */
	_set_readonly() {
		if ( this.readonly ) {
			this.$.label.setAttribute( "readonly", "" );
		} else {
			this.$.label.removeAttribute( "readonly" );
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
		} else {
			this.$.label.removeAttribute( "disabled" );
		}
	}

	/**
	 * @method	_textarea_adjust
	 * 
	 * Pone el textarea como ajustable.
	 */
	_textarea_adjust() {
		if( this.noadjust || !Polymer.TextareaAdjust ) {
			return false;
		}
		
		if( this.maxheight > 0 ) {
			Polymer.TextareaAdjust.init( this.inputElement, { maxHeight: this.maxheight } );
		} else {
			Polymer.TextareaAdjust.init( this.inputElement );
		}
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
	 * @method	_focusin
	 * 
	 * Acciones a realizar cuando se hace focus sobre el input.
	 */
	_focusin() {
		super._focusin();
		
		// Impedimos si es de solo lecutura o está desactivado.

		if( this.readonly || this.disabled ) {
			this.inputElement.blur();
			return false;
		}

		// Ponemos el focusl a label

		this.$.label.setAttribute( "focused", "" );
		this.$.baseline.setAttribute( "focused", "" );
		this.$.container.setAttribute( "focused", "" );

		if( this.inputElement.value.length == 1 && this.inputElement.value == " " ) {
			this.inputElement.value = "";
		}

		// Invocamos la función externa keyup

		if ( typeof this.focusinfunc === "function" ) {
			this.focusinfunc( this.inputElement );
		}
	}

	/**
	 * @method	_focusout
	 * 
	 * Acciones a realizar cuando se quita el focus del input.
	 */
	_focusout() {
		super._focusout();

		// Quitamos el label focused

		this.$.label.removeAttribute( "focused" );
		this.$.baseline.removeAttribute( "focused" );
		this.$.container.removeAttribute( "focused" );

		// Invocamos la función externa focusout

		if ( typeof this.focusoutfunc === "function" ) {
			this.focusoutfunc( this.inputElement );
		}
	}

	/**
	 * @method	_keypress
	 * 
	 * Acciones a realizar cuando se presiona una tecla sobre el input.
	 */
	_keypress() {
		// Invocamos la función externa keypress

		if ( typeof this.keypressfunc === "function" ) {
			this.keypressfunc( this.inputElement );
		}
	}

	/**
	 * @method	_keyup
	 * 
	 * Acciones a realizar cuando se levanta una tecla sobre el input.
	 */
	_keyup() {
		super._keyup();

		if( this.inputElement.value ) {
			this.$.label.setAttribute( "writted", "" );
		} else {
			this.$.label.removeAttribute( "writted" );
		}
	
		// Invocamos la función externa keyup

		if ( typeof this.keyupfunc === "function" ) {
			this.keyupfunc( this.inputElement );
		}
	}

	/**
	 * @method	_change
	 * 
	 * Acciones a realizar cuando se realiza un cambio en el input.
	 */
	_change() {
		// Invocamos la función externa de change change

		if ( typeof this.changefunc === "function" ) {
			this.changefunc( this.inputElement );
		}

		// Si el input tiene el atributo "novalidate" o no tiene el validateonchange, no se valida

		if ( this.novalidate ) {
			return false;
		}

		if ( !this.validateonchange ) {
			return false;
		}

		if ( this.parentForm && this.parentForm.novalidate ) {
			return false;
		}

		// Validamos el campo

		this.__errorValidateInput( this.inputElement );
	}
}

window.customElements.define( "aw-textarea", AwTextarea );