<template>
	<div>
		<draggable
      class="gallery-preview-list"
			v-model="images"
			item-key="filename"
			handle=".gallery-item"
			@start="dragging = true"
			@end="draggEnd()"
			>
				<div class="gallery-item-wrap" v-for="(image, index) in images" :key="index">
				<div class="gallery-item-actions">
					<div class="remove-icon" @click="deleteGalleryItem(image)" alt="remove">
					<svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg"><rect y="14.3154" width="20.2454" height="2.38181" rx="1.1909" transform="rotate(-45 0 14.3154)" fill="white"></rect><rect x="1.68555" width="20.2454" height="2.38181" rx="1.1909" transform="rotate(45 1.68555 0)" fill="white"></rect></svg>
					</div>
				</div>
				<div class="gallery-item" v-if="image">
          <span v-if="image.file">
            <img :src="image.file.url" v-if="image.file.type !== 'video/mp4'"/>
            <video muted playsinline="" loop="" controls v-else>
                <source :src="event.file.url" :type="event.file.type">
            </video>
          </span>
				</div>
				</div>
		</draggable>
	</div>
	
</template>

<script setup>

const emit = defineEmits(['delete-gallery-item', 'drag-end'])
const props = defineProps({
	images: { type: Array },
  imagesType: { type: String }
})

const imagesUpdated = ref([])

//const images = ref([...props.images])
// const images = computed(() => props.images)

const images = computed({
  get(){
    return props.images
  },
  set(newValue){
     imagesUpdated.value = newValue
  }
})

const draggEnd = async () => {
  const data = {
    images: imagesUpdated,
    type: props.imagesType
  }
  emit('drag-end',  data)
};

const deleteGalleryItem = async (image) => {
	emit('delete-gallery-item', image)
};

</script>

<style lang="scss">

.gallery-preview-list {
  display: flex;
  flex-wrap: wrap;
}

.gallery-item-wrap {
  position: relative;
  width: 150px;
  display: inline-flex;
  margin: 0.25rem;

  .gallery-item-actions {
    position: absolute;
    top: -4px;
    right: -4px;
    display: flex;

    .remove-icon {
      font-size: 12px;
      font-weight: 700;
      cursor: pointer;
      position: relative;
      width: 24px;
      height: 24px;
      background: #111;
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 99px;
      

      svg {
          transform: scale(0.65);
          transition: all .15s ease;
      }

      &:hover {
        
        svg {
          transform: scale(0.75);
        }
      }
      
    }


  }

  .gallery-item {
    width: 100%;
    cursor: move;
    display: inline-flex;
    margin: 0.25rem;
  }
}

</style>
