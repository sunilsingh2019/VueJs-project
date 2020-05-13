<template>
    <div :class="sizeClass">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        props: {
            md: { required: false },
            lg: { required: false },
            sm: { required: false },
            xs: { required: false },
        },

        computed: {
            sizeClass() {
                let cl = '';
                if( this.lg ) cl += `col-lg-${this.lg} `;
                if( this.md ) cl += `col-md-${this.md} `;
                if( this.sm ) cl += `col-sm-${this.sm} `;
                if( this.xs ) cl += `col-xs-${this.xs} `;

                return cl;
            }
        }
    }
</script>