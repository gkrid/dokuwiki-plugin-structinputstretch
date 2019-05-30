jQuery(function() {
    var $ = jQuery;
    // txt is the text to measure, font is the full CSS font declaration,
    // e.g. "bold 12px Verdana"
    function measureText(txt, font) {
        var id = 'structinputstretch__text-width-tester',
            $tag = $('#' + id);
        if (!$tag.length) {
            $tag = $('<span id="' + id + '" style="display:none;font:' + font + ';">' + txt + '</span>');
            $('body').append($tag);
        } else {
            $tag.css({font:font}).html(txt);
        }
        return {
            width: $tag.width(),
            height: $tag.height()
        }
    }

    function stretchInput() {
        var $input = $(this);
        //save start value
        if (!$input.data('structinputstretch__minWidth')) {
            $input.data('structinputstretch__minWidth', $input.width());
            $input.data('structinputstretch__maxWidth', $input.closest('fieldset').width());
        }
        var minWidth = $input.data('structinputstretch__minWidth'),
            maxWidth = $input.data('structinputstretch__maxWidth'),
            inputFont = $input.css('font'),
            inputTextWidth = measureText($input.val(), inputFont).width + 20;

        if (inputTextWidth <= minWidth) {
            $input.width(minWidth);
        } else if (inputTextWidth >= maxWidth) {
            $input.width(maxWidth);
        } else {
            $input.width(inputTextWidth);
        }
    }

    $('body').on('input autocompleteclose', 'input[id^=struct__]', stretchInput);
});