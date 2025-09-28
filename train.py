import tensorflow as tf
from tensorflow.keras import layers, models
import tensorflowjs as tfjs

# 1. Load dataset dari folder
train_ds = tf.keras.utils.image_dataset_from_directory(
    "./src/assets/BISINDO",   # path relatif dari file ini
    labels="inferred",
    label_mode="int",
    image_size=(64, 64),
    color_mode="rgb",
    batch_size=32,
    shuffle=True,
    seed=123,
    validation_split=0.2,
    subset="training"
)

val_ds = tf.keras.utils.image_dataset_from_directory(
    "./src/assets/BISINDO",
    labels="inferred",
    label_mode="int",
    image_size=(64, 64),
    color_mode="rgb",
    batch_size=32,
    shuffle=True,
    seed=123,
    validation_split=0.2,
    subset="validation"
)

# 2. Normalisasi
normalization_layer = layers.Rescaling(1./255)
train_ds = train_ds.map(lambda x, y: (normalization_layer(x), y))
val_ds = val_ds.map(lambda x, y: (normalization_layer(x), y))

# 3. Model CNN
model = models.Sequential([
    layers.Input(shape=(64,64,3)),   # 👈 lebih clean
    layers.Conv2D(32, (3,3), activation='relu'),
    layers.MaxPooling2D((2,2)),
    layers.Conv2D(64, (3,3), activation='relu'),
    layers.MaxPooling2D((2,2)),
    layers.Flatten(),
    layers.Dense(128, activation='relu'),
    layers.Dense(26, activation='softmax')  # 26 huruf A-Z
])

model.compile(optimizer="adam",
              loss="sparse_categorical_crossentropy",
              metrics=["accuracy"])

# 4. Training
model.fit(train_ds, validation_data=val_ds, epochs=10)

# 5. Save ke TFJS (biar React bisa load)
tfjs.converters.save_keras_model(model, "./public/model-tfjs")
