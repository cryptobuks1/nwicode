<?php
/**
 * Class Nwicode_Form_Element_Password
 */
class Nwicode_Form_Element_Password extends Zend_Form_Element_Password {

    /**
     * @var bool
     */
    public $is_form_horizontal = true;

    /**
     * @param $boolean
     */
    public function setIsFormHorizontal($boolean) {
        $this->is_form_horizontal = $boolean;
    }

    /**
     * @var string
     */
    public $color = "color-blue";

    /**
     * @param $color
     */
    public function setColor($color) {
        $this->color = $color;
    }

	/**
	 * @throws Zend_Form_Exception
	 */
	public function init(){
		$this->addPrefixPath('Nwicode_Form_Decorator_', 'Nwicode/Form/Decorator/', 'decorator');
		$this->addFilters(['StringTrim','StripTags']);
		$this->setDecorators([
	  		'ViewHelper',
           	['Errors', [
           		'placement'=>Zend_Form_Decorator_Abstract::PREPEND,
           		'class'=>'alert alert-error form-error']
            ],
            ['Description', [
                'placement' => Zend_Form_Decorator_Abstract::APPEND,
                'class' => 'help-block',
                'escape' => false,
            ]],
            [['controls' => 'HtmlTag'], [
                'tag'   => 'div',
                'class' => 'controls',
            ]],
            ['Label', [
                'class' => 'control-label',
                'requiredSuffix' => ' *',
                'escape' => false,
                'placement' => Zend_Form_Decorator_Abstract::PREPEND
            ]],
            ['ControlGroup']
        ]);
	}

	/**
	 * @return Nwicode_Form_Element_Password
	 */
	public function setNewDesign(){
		$this->addClass("input-flat");

        if($this->is_form_horizontal) {
            $label_class = "col-sm-3";
            $element_class = "col-sm-7";
            $error_class = "col-sm-7 col-sm-offset-3";
        } else {
            $label_class = "";
            $element_class = "";
            $error_class = "";
        }

		return $this->setDecorators([
	  		'ViewHelper',
			[['wrapper'=>'HtmlTag'], [
				'class' => ' '.$element_class
            ]],
            ['Description', [
                'placement' => Zend_Form_Decorator_Abstract::APPEND,
                'class' => 'sb-form-line-complement sb-form-description '.$error_class,
            	'escape' => false
            ]],
            ['Label', [
                'class' => 'sb-form-line-title '.$label_class,
                'requiredSuffix' => ' *',
                'escape' => false,
                'placement' => Zend_Form_Decorator_Abstract::PREPEND,
            ]],
           	['Errors', [
           		'placement'=>Zend_Form_Decorator_Abstract::PREPEND,
           		'class'=>'alert alert-error'
            ]],
            [['cb' => 'HtmlTag'], [
            	'class' => 'sb-cb',
            	'placement' => Zend_Form_Decorator_Abstract::APPEND,
            ]],
            ['ControlGroup', [
            	'class' => 'form-group sb-form-line'
            ]]
        ]);
	}

	/**
	 * @param $new
	 * @return Nwicode_Form_Element_Password
	 */
    public function addClass($new) {
	    return Nwicode_Form_Abstract::addClass($new, $this);
	}

	/**
	 * @param $title
	 * @return Nwicode_Form_Element_Password
	 * @throws Zend_Form_Exception
	 */
	public function setTooltip($title) {
		$this->addClass('sb-tooltip');
		$this->setAttrib('title', str_replace('"', "'", $title));
		return $this;
	}

}