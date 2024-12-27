const bcrypt = require('bcryptjs');
const User = require('../model/userModel');

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

       
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Cet email est déjà utilisé' });
        }

       
        const idCardPath = req.file ? req.file.path : null;

        if (!idCardPath) {
            return res.status(400).json({ message: 'Veuillez fournir une pièce d’identité.' });
        }

      
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Créer un nouvel utilisateur
        const user = new User({
            name,
            email,
            password: hashedPassword,
            idCard: idCardPath,
        });

        await user.save();

        res.status(201).json({
            message: 'Utilisateur créé avec succès',
            userId: user._id,
        });
    } catch (error) {
        console.error('Erreur lors de l\'inscription:', error);
        res.status(500).json({ message: 'Erreur lors de l\'inscription' });
    }
};

module.exports = { registerUser };
